import { ApiProperty, OmitType } from '@nestjs/swagger';
import { TestEntity } from '../../entities/test.entity';
import { CreateTestQuestionDto } from '../test-question-dto';

export class CreateTestDto extends OmitType(TestEntity, ['id', 'subject']) {
  @ApiProperty({type:CreateTestQuestionDto, isArray:true})
  questions: CreateTestQuestionDto[];
}
