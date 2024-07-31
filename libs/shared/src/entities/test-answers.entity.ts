import { ApiProperty } from '@nestjs/swagger';
import { BaseNameEntity } from './catalog-base.entity';
import { TestQuestionEntity } from './test-question.entity';

export class TestAnswersEntity extends BaseNameEntity{
  @ApiProperty()
  is_correct?:boolean
  @ApiProperty()
  question_id?:string
  @ApiProperty()
  question?:TestQuestionEntity
  @ApiProperty()
  photo_id?:string
}
