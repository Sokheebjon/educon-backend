import {  ApiProperty, OmitType } from '@nestjs/swagger';
import { TestQuestionEntity } from '../../entities/test-question.entity';
import { CreateTestAnswerDto } from '../test-answer-dto';

export class CreateTestQuestionDto extends OmitType(TestQuestionEntity, [
  'id',"test","test_id",
]) {
  @ApiProperty({type:CreateTestAnswerDto, isArray:true})
  test_answers:CreateTestAnswerDto[]
}
