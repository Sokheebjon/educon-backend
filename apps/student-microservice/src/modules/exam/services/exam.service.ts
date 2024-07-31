import { BadRequestException, Injectable } from '@nestjs/common';
import { RegistrationRepository } from '../../registration/repository/registration.repository';
import { handleAsyncOperation } from '@edufin-back/common';
import { CatalogConnectorService } from '../../../connector-services/catalog-connector.service';
import { TestConnectorService } from '../../../connector-services/test-connector.service';
import { ApplicationStatus } from '@edufin-back/student-prisma-client';
import { RpcException } from '@nestjs/microservices';
import { JwtPayload } from '@edufin-back/shared/types';
import { AnswerToTestDto } from '@edufin-back/shared/dto';

@Injectable()
export class ExamService {
  constructor(
    private readonly catalogConnectorService: CatalogConnectorService,
    private readonly testConnectorService: TestConnectorService,
    private readonly registrationRepository: RegistrationRepository
  ) {}
  async getExamTestsByRegistrationId(registrationId: string) {
    const registration = await handleAsyncOperation(
      this.registrationRepository.findUniqueNotParsed(registrationId)
    );
    if (
      registration?.status === 'APPROVED_FOR_EXAM' ||
      registration?.status === 'EXAM_STARTED'
    ) {
      const educationDirection =
        await this.catalogConnectorService.getSingleEducationDirection(
          registration?.education_direction_id
        );
      let examEndTime = new Date();

      const testSubjectAndCount = educationDirection?.academic_blocks?.map(
        (ab) => {
          return { subject: ab?.subject, count: ab?.tests_count };
        }
      );

      const allTest = await handleAsyncOperation(
        this.testConnectorService.getTestsBySubjectId({
          testSubjectAndCount,
          registration_id: registration.id,
          status: registration.status,
        })
      );
      if (registration?.status === 'APPROVED_FOR_EXAM') {
        const total_exam_minutes = educationDirection?.academic_blocks?.reduce(
          (acc, curr) => (acc += curr?.test_duration),
          0
        );
        const examStartTime = new Date();

        examEndTime = new Date(
          examStartTime.getTime() + total_exam_minutes * 60000
        );
        await this.registrationRepository.update(registration?.id, {
          exam_end_time: examEndTime,
          step: registration?.step,
        });
        await this.registrationRepository.updateApplicationStatusMutation({
          id: registration?.id,
          status: ApplicationStatus.EXAM_STARTED,
        });
      } else {
        examEndTime = registration?.exam_end_time;
      }

      return { allTest, examEndTime };
    } else {
      throw new RpcException(
        new BadRequestException({
          message: 'You are not approved for exam',
        })
      );
    }
  }
  async answerToTest(
    currentUser: JwtPayload,
    answerToTestDto: AnswerToTestDto
  ) {
    const regostration = await this.registrationRepository.findUniqueNotParsed(
      currentUser?.sub
    );

    if (!regostration) {
      throw new RpcException(
        new BadRequestException({
          message: { message: 'Applications not found', errorCode: 1000 },
        })
      );
    }
    if (regostration?.exam_end_time < new Date()) {
      throw new RpcException(
        new BadRequestException({
          message: {
            message: 'Exam time finished',
            errorCode: 1001,
          },
        })
      );
    }
    const answer = await this.testConnectorService.writeAnswers({
      answer_id: answerToTestDto?.answer_id,
      question_id: answerToTestDto?.question_id,
      registration_id: regostration?.id,
    });

    return { answer };
  }
}
