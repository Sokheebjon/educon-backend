import { PartialType } from '@nestjs/swagger';
import { CreateEducationLanguageDto } from './create-education-language.dto';

export class UpdateEducationLanguageDto extends PartialType(
  CreateEducationLanguageDto
) {}
