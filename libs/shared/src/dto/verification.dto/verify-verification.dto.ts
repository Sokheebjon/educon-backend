import { PickType } from '@nestjs/swagger';
import { VerificationEntity } from '../../entities/verification.entity';

export class VerifyVerificationDto extends PickType(VerificationEntity, [
  'id',
  'code',
]) {}
