import {
  Body,
  Controller,
  Get,
  Post,
} from '@nestjs/common';

import { ApiTags } from '@nestjs/swagger';
import { ExamService } from './exam.service';
import { CurrentUser } from '@edufin-back/common/decorators';
import { JwtPayload } from '@edufin-back/shared/types';
import { AnswerToTestDto } from '@edufin-back/shared/dto';

@ApiTags('Exam')
@Controller('exam')
export class ExamController {
  constructor(private readonly examService: ExamService) {}
  @Get('tests')
  getTestsForExam(@CurrentUser() currentUser: JwtPayload) {
    return this.examService.getTestsForExam(currentUser)
  }
  @Post("answer-to-question")
  async answerToTest(@CurrentUser() currentUser: JwtPayload,@Body() answerToTestDto:AnswerToTestDto){
    return this.examService.answerToTest(currentUser,answerToTestDto)

  }
}
