import { OmitType } from '@nestjs/swagger';
import { PositionEntity } from '../../entities/position.entity';

export class CreatePositionDto extends OmitType(PositionEntity, [
  'id',
  'createdAt',
  'updatedAt',
]) {}
