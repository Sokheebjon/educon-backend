import { ApiProperty } from '@nestjs/swagger';
import { AcademicSubjectEntity } from './academic-subject.entity';

export class AcademicBlockEntity {
  @ApiProperty()
  id?: string;
  @ApiProperty()
  subject_id: string;

  @ApiProperty()
  score: number;
  @ApiProperty()
  tests_count: number;
  @ApiProperty()
  test_duration: number;
  subject?: AcademicSubjectEntity;
}
