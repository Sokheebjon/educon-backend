import { ApiProperty } from '@nestjs/swagger';
import { AcademicSubjectEntity } from './academic-subject.entity';
import { TestQuestionEntity } from './test-question.entity';

export class TestEntity {
  @ApiProperty()
  id?: string;
  @ApiProperty()
  subject_id: string;
  @ApiProperty()
  subject?: AcademicSubjectEntity;
  @ApiProperty()
  test_count: number;
  @ApiProperty({type:TestQuestionEntity, isArray:true})
  questions: TestQuestionEntity[];
}
