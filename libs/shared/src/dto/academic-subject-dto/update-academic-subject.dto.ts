import { PartialType } from '@nestjs/swagger';
import { CreateAcademicSubjectDto } from './create-academic-subject.dto';

export class UpdateAcademicSubjectDto extends PartialType(
  CreateAcademicSubjectDto
) {}
