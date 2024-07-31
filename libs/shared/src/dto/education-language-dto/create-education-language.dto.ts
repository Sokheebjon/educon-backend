import { ApiProperty, OmitType } from '@nestjs/swagger';
import { EducationLanguageEntity } from '../../entities/education-language.entity';

export class CreateEducationLanguageDto extends OmitType(
  EducationLanguageEntity,
  ['id']
) {
  @ApiProperty()
  education_directionIds: string[];
}
