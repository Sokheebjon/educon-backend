import { AnswerToTestDto } from '@edufin-back/shared/dto';
import { JwtPayload } from '@edufin-back/shared/types';
import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class ExamService {
  constructor(
    @Inject('STUDENT_MICROSERVICE') private readonly studentClient: ClientKafka
  ) {}
  async getTestsForExam(currentUser: JwtPayload) {
    return this.studentClient.send('get-exam-tests', currentUser);
  }
  async answerToTest(currentUser: JwtPayload,answerToTestDto:AnswerToTestDto){
    return await this.studentClient.send(
      'answer_to_test',
      JSON.stringify({currentUser,answerToTestDto})
    );
  }
}
