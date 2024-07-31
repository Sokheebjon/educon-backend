import { OmitType } from '@nestjs/swagger';
import { AcademicSubjectEntity } from '../../entities/academic-subject.entity';

export class CreateAcademicSubjectDto extends OmitType(AcademicSubjectEntity, [
  'id',
  'createdAt',
  'updatedAt',
]) {}
