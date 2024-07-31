import { PickType } from '@nestjs/swagger';
import { VerificationEntity } from '../../entities/verification.entity';

export class CreateVerificationDto extends PickType(VerificationEntity, [
  'phoneNumber',
]) {}
