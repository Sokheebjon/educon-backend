import { ApiProperty } from '@nestjs/swagger';
import { BaseNameEntity } from './catalog-base.entity';
import { AcademicBlockEntity } from './academic-block.entity';
import { AcademicDegreeEntity } from './academic-degree.entity';
import { EducationDirectionDurationEntity } from './education-direction-duration.entity';

export class EducationDirectionEntity extends BaseNameEntity  {

  @ApiProperty({ required: true })
  allowed_courses: number[];
  @ApiProperty({ required: true })
  code: number;
  @ApiProperty({ required: true })
  short_title: string;
  @ApiProperty({ required: true })
  academic_degree_id: string;
  @ApiProperty({ required: true })
  duration?: EducationDirectionDurationEntity[];
  @ApiProperty({ required: true, type: AcademicBlockEntity, isArray: true })
  academic_blocks?: AcademicBlockEntity[];
  @ApiProperty()
  registration_purpose_ids?:string[]
  academic_degree?:AcademicDegreeEntity
}
