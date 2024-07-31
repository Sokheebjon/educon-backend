import { OmitType } from '@nestjs/swagger';
import { DepartmentEntity } from '../../entities/department.entity';

export class CreateDepartmentDto extends OmitType(DepartmentEntity, [
  'id',
  'createdAt',
  'updatedAt',
]) {}
