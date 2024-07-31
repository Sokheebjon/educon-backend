import {
  CreateTestDto,
  GetResourceTestDto,
  GetTestsByRegistration,
  UpdateAnswerToTestDto,
  UpdateTestDto,
} from '@edufin-back/shared/dto';
import {
  BadRequestException,
  Inject,
  Injectable,
  OnModuleInit,
} from '@nestjs/common';
import { TestRepository } from '../repository/test.repository';
import { ClientKafka, RpcException } from '@nestjs/microservices';
import { handleAsyncOperation } from '@edufin-back/common';

@Injectable()
export class TestService implements OnModuleInit {
  constructor(
    private readonly testRepository: TestRepository,
    @Inject('CATALOG_MICROSERVICE') private readonly catalogClient: ClientKafka
  ) {}
  async onModuleInit() {
    await this.catalogClient.subscribeToResponseOf(
      'findOne_catalog_academic_subject'
    );

    await this.catalogClient.connect();
  }
  async create(createTestDto: CreateTestDto) {
    return await this.testRepository.create(createTestDto);
  }
  async update(id: string, updateTestDto: UpdateTestDto) {
    try {
      return await this.testRepository.update(id, updateTestDto);
    } catch (err) {
      throw new RpcException(
        new BadRequestException({
          message: err?.message,
        })
      );
    }
  }
  async findOne(id: string) {
    return await handleAsyncOperation(this.testRepository.findOne(id));
  }
  async deleteOne(id: string) {
    return await handleAsyncOperation(this.testRepository.deleteOne(id));
  }
  async getResource({ page, take }: GetResourceTestDto) {
    return await handleAsyncOperation(
      this.testRepository.getResorce({ page, take })
    );
  }
  async getTestsBySubjectId(payload: GetTestsByRegistration) {
    return await handleAsyncOperation(
      this.testRepository.getTestBySubjectIdQuery(payload)
    );
  }

  async updateTestAnswer(payload: UpdateAnswerToTestDto) {
    return await handleAsyncOperation(
      this.testRepository.updateTestAnswer(payload)
    );
  }
  async calculateTestResult(registration_id: string) {
    const testAnswers =
      await this.testRepository.getTestAnswersByRegistrationId(registration_id);
    if (!testAnswers.length) {
      throw new RpcException(
        new BadRequestException({
          message: 'Cant find any test results with this registration id',
        })
      );
    }
    const resultMap = new Map();
    testAnswers?.forEach((item) => {
      if (resultMap.has(item?.subject_id)) {
        let correct_answers = resultMap?.get(item?.subject_id)?.correct_answers;
        if (item?.answer_id === item?.question?.test_answers?.[0]?.id) {
          correct_answers++;
        }
        resultMap.set(item?.subject_id, {
          ...resultMap?.get(item?.subject_id),
          correct_answers,
        });
      } else {
        let correct_answers = 0;
        if (item?.answer_id === item?.question?.test_answers?.[0]?.id) {
          correct_answers++;
        }
        resultMap.set(item?.subject_id, {
          subject_id: item?.subject_id,
          correct_answers,
        });
      }
    });
    return { data: Array.from(resultMap.values()) };
  }
  async calculateDetailedTestResult(registration_id: string) {
    const testAnswers =
      await this.testRepository.getTestAnswersByRegistrationId(registration_id);
    if (!testAnswers.length) {
      throw new RpcException(
        new BadRequestException({
          message: 'Cant find any test results with this registration id',
        })
      );
    }
    const formattedData = testAnswers?.map((item) => {
      return {
        question: item?.question,
        isCorrect: item?.answer_id === item?.question?.test_answers?.[0]?.id,
      };
    });
    return formattedData;
  }
  async deleteTestResults(registration_id: string) {
     await this.testRepository.deleteAllByRegistrationId(registration_id);
  }
}
