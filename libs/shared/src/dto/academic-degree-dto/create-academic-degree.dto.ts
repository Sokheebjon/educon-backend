import { OmitType } from '@nestjs/swagger';
import { AcademicDegreeEntity } from '../../entities/academic-degree.entity';

export class CreateAcademicDegreeDto extends OmitType(AcademicDegreeEntity, [
  'id',
  'createdAt',
  'updatedAt',
]) {}
