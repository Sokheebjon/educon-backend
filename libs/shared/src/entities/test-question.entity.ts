import { ApiProperty } from '@nestjs/swagger';
import { BaseNameEntity } from './catalog-base.entity';
import { TestEntity } from './test.entity';
import { TestAnswersEntity } from './test-answers.entity';

export class TestQuestionEntity extends BaseNameEntity {
 @ApiProperty({type:TestAnswersEntity})
  test_answers:TestAnswersEntity[]
  @ApiProperty()
  photo_id:string
  @ApiProperty()
  test_id?:string
  @ApiProperty({type:TestEntity})
  test?:TestEntity
}
