import { ApiProperty, OmitType } from '@nestjs/swagger';
import { BaseNameEntity } from './catalog-base.entity';

export class ExamFormEntity extends OmitType(BaseNameEntity, ['id']) {
  @ApiProperty({ required: false })
  id?: number;
}
