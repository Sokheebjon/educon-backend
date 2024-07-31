import { Controller, Inject, OnModuleInit } from '@nestjs/common';
import { ClientKafka, MessagePattern, Payload } from '@nestjs/microservices';

import { ExamService } from '../services/exam.service';
import { JwtPayload } from '@edufin-back/shared/types';
import { AnswerToTestDto } from '@edufin-back/shared/dto';

@Controller()
export class ExamController implements OnModuleInit {
  constructor(
    @Inject('TEST_MICROSERVICE') private readonly testClient: ClientKafka,
    private readonly examService: ExamService
  ) {}
  async onModuleInit() {
    this.testClient.subscribeToResponseOf('get_tests_by_registration_id');
    this.testClient.subscribeToResponseOf('update_test_answer_by_registration_id');
    await this.testClient.connect();
  }

  @MessagePattern('get-exam-tests')
  async getExamTestsByRegistrationId(@Payload() currentUser: JwtPayload) {
    return this.examService.getExamTestsByRegistrationId(currentUser?.sub);
  }
  @MessagePattern("answer_to_test")
  answerToTest(@Payload() payload: {currentUser: JwtPayload,answerToTestDto:AnswerToTestDto}){
    return this.examService.answerToTest(payload.currentUser,payload?.answerToTestDto)
  }
}
