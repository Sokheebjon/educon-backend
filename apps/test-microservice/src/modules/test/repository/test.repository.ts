import {
  CreateTestDto,
  GetResourceTestDto,
  GetTestsByRegistration,
  UpdateAnswerToTestDto,
  UpdateTestDto,
} from '@edufin-back/shared/dto';
import { TestPrismaService } from '@edufin-back/test-prisma-client';
import { BadRequestException, Injectable } from '@nestjs/common';
import { CatalogConnectorService } from '../services/catalog-connector.service';
import { TestQuestionEntity } from '@edufin-back/shared/entities';
import { RpcException } from '@nestjs/microservices';
import { handleAsyncOperation } from '@edufin-back/common';

@Injectable()
export class TestRepository {
  constructor(
    private readonly testPrismaService: TestPrismaService,
    private readonly catalogConnectorService: CatalogConnectorService
  ) {}

  async create(createTestDto: CreateTestDto) {
    const { subject_id, test_count, questions } = createTestDto;
    return await handleAsyncOperation(
      this.testPrismaService.tests.create({
        data: {
          subject_id,
          test_count,
          questions: {
            create: questions?.map(async (question) => {
              return {
                nameEn: question?.nameEn,
                nameUz: question?.nameUz,
                nameRu: question?.nameRu,
                photo_id: question?.photo_id,
                test_answers: {
                  create: question?.test_answers?.map(async (answer) => {
                    return answer;
                  }),
                },
              };
            }),
          },
        },
      })
    );
  }
  async update(id: string, updateTestDto: UpdateTestDto) {
    const { subject_id, test_count, questions } = updateTestDto;
    const updated_version = await this.testPrismaService.tests.update({
      where: { id },
      data: { subject_id, test_count },
      include: {
        questions: true,
      },
    });
    for (const question of questions) {
      if (question.id) {
        // Update existing question
        await this.testPrismaService.testQuestions.update({
          where: { id: question.id },
          data: {
            nameEn: question.nameEn,
            nameUz: question.nameUz,
            nameRu: question.nameRu,
            photo_id: question.photo_id,
          },
        });

        // Manage test answers for existing question
        const currentAnswers =
          await this.testPrismaService.testAnswers.findMany({
            where: { question_id: question.id },
          });

        // Update and create answers
        for (const answer of question.test_answers) {
          if (answer.id) {
            // Update existing answer
            await this.testPrismaService.testAnswers.update({
              where: { id: answer.id },
              data: {
                nameEn: answer.nameEn,
                nameUz: answer.nameUz,
                nameRu: answer.nameRu,
                is_correct: answer.is_correct,
                photo_id: answer.photo_id,
              },
            });
          } else {
            // Create new answer
            await this.testPrismaService.testAnswers.create({
              data: {
                question_id: question.id,
                nameEn: answer.nameEn,
                nameUz: answer.nameUz,
                nameRu: answer.nameRu,
                is_correct: answer.is_correct,
                photo_id: answer.photo_id,
              },
            });
          }
        }

        // Identify and delete any removed answers
        const answerIdsToUpdate = question.test_answers
          .filter((a) => a.id)
          .map((a) => a.id);
        const answersToDelete = currentAnswers.filter(
          (a) => !answerIdsToUpdate.includes(a.id)
        );
        for (const answer of answersToDelete) {
          await this.testPrismaService.testAnswers.delete({
            where: { id: answer.id },
          });
        }
      } else {
        // Create new question with answers
        await this.testPrismaService.testQuestions.create({
          include: {
            test_answers: true,
          },
          data: {
            test: {
              connect: {
                id,
              },
            },
            nameEn: question.nameEn,
            nameUz: question.nameUz,
            nameRu: question.nameRu,
            photo_id: question.photo_id,
            test_answers: {
              create: question.test_answers.map((answer) => ({
                nameEn: answer.nameEn,
                nameUz: answer.nameUz,
                nameRu: answer.nameRu,
                is_correct: answer.is_correct,
                photo_id: answer.photo_id,
              })),
            },
          },
        });
      }
    }

    // Optionally, handle deletions if there are any questions to be removed
    const currentQuestionsIds = updated_version?.questions.map((q) => q.id);
    const commingQuestions = updateTestDto?.questions
      ?.filter((item) => item?.id)
      .map((item) => item?.id);
    const questionsToDelete = currentQuestionsIds.filter(
      (q) => !commingQuestions.includes(q)
    );
    for (const question of questionsToDelete) {
      await this.testPrismaService.testQuestions.delete({
        where: { id: question },
      });
    }
    return updated_version;
  }

  async findOne(id: string) {
    const rowData = await handleAsyncOperation(
      this.testPrismaService.tests.findUnique({
        where: { id },
        include: {
          questions: {
            include: {
              test_answers: true,
            },
          },
        },
      })
    );
    const subject = await this.catalogConnectorService.getOne({
      id: rowData?.subject_id,
    });

    return { ...rowData, subject };
  }
  async deleteOne(id: string) {
    return await handleAsyncOperation(
      this.testPrismaService.tests.deleteMany({
        where: { id },
      })
    );
  }
  async getResorce({ page, take }: GetResourceTestDto) {
    const skip = +take * +page;
    const dataCount = await this.testPrismaService.tests.count({});

    const rowData = await this.testPrismaService.tests.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      skip,
      take: +take,
    });
    const populateSubject = rowData?.map(async (el) => {
      const subject = await this.catalogConnectorService.getOne({
        id: el?.subject_id,
      });
      return {
        ...el,
        subject,
      };
    });
    const data = await Promise.all(populateSubject);
    return {
      data,
      meta: {
        total: dataCount,
        page,
      },
    };
  }
  async getTestBySubjectIdQuery({
    status,
    registration_id,
    testSubjectAndCount,
  }: GetTestsByRegistration) {
    if (status === 'APPROVED_FOR_EXAM') {
      const testQuestions = testSubjectAndCount?.map(async (i) => {
        const test = await this.testPrismaService?.tests.findFirst({
          where: {
            subject_id: i?.subject?.id,
          },
        });

        const questions: TestQuestionEntity[] = await this.testPrismaService
          .$queryRaw`
        SELECT * FROM "TestQuestions"
        WHERE "test_id" = ${test?.id}
        ORDER BY RANDOM()
        LIMIT ${i.count}
      `;
        for (const q of questions) {
          const answers = await this.testPrismaService.testAnswers.findMany({
            where: {
              question_id: q.id,
            },
            select: {
              id: true,
              nameEn: true,
              nameRu: true,
              nameUz: true,
              photo_id: true,
            },
          });
          q.test_answers = answers;
          await this.testPrismaService.studentTestsAnswers.create({
            data: {
              registration_id,
              question_id: q?.id,
              subject_id: i?.subject?.id,
            },
          });
        }
        return { subject: i?.subject, questions };
      });
      return await Promise.all(testQuestions);
    } else if (status === 'EXAM_STARTED') {
      const testQuestions = testSubjectAndCount?.map(async (i) => {
        const studentAnswers =
          await this.testPrismaService?.studentTestsAnswers.findMany({
            orderBy: {
              createdAt: 'asc',
            },
            where: {
              subject_id: i?.subject?.id,
              registration_id,
            },
            include: {
              question: {
                include: {
                  test_answers: {
                    select: {
                      id: true,
                      nameEn: true,
                      nameRu: true,
                      nameUz: true,
                      photo_id: true,
                    },
                  },
                },
              },
            },
          });
        const questions = [];

        for (const sa of studentAnswers) {
          questions.push({ ...sa?.question, answer_id: sa?.answer_id });
        }

        return { subject: i?.subject, questions };
      });
      return await Promise.all(testQuestions);
    } else {
      throw new RpcException(
        new BadRequestException({
          message: 'You are not approved for exam',
        })
      );
    }
  }
  async updateTestAnswer(payload: UpdateAnswerToTestDto) {
    return await handleAsyncOperation(
      this.testPrismaService.studentTestsAnswers.update({
        where: {
          registration_id_question_id: {
            registration_id: payload?.registration_id,
            question_id: payload?.question_id,
          },
        },
        data: {
          answer_id: payload?.answer_id,
        },
      })
    );
  }
  async getTestAnswersByRegistrationId(registration_id: string) {
    return await handleAsyncOperation(
      this.testPrismaService.studentTestsAnswers.findMany({
        where: { registration_id },
        include: {
          question: {
            include: {
              test_answers: {
                where: { is_correct: true },
              },
            },
          },
        },
      })
    );
  }
  async deleteAllByRegistrationId(registration_id: string) {
    await handleAsyncOperation(
      this.testPrismaService.studentTestsAnswers.deleteMany({
        where: { registration_id },
      })
    );
  }
}
