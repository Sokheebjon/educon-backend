import { ApiProperty, OmitType } from '@nestjs/swagger';
import { EducationFormEntity } from '../../entities/education-form.entity';

export class CreateEducationFormDto extends OmitType(EducationFormEntity, [
  'id',
]) {
  @ApiProperty()
  education_directionIds: string[];
  @ApiProperty()
  registration_purposeIds: string[];
}
