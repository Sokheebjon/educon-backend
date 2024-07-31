import { ApiProperty } from '@nestjs/swagger';
import { EducationDirectionEntity } from './education-direction.entity';
import { EducationFormEntity } from './education-form.entity';

export class EducationDirectionDurationEntity {
  @ApiProperty()
  id?: string;
  @ApiProperty()
  education_direction_id: string;
  @ApiProperty()
  education_form_id: string;
  @ApiProperty()
  duration: number;
  @ApiProperty()
  duration_text: string;
  education_direction?: Partial<EducationDirectionEntity>;
  education_form?: Partial<EducationFormEntity>


}
