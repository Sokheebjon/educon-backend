import { OmitType } from '@nestjs/swagger';
import { RegistrationPurposeEntity } from '../../entities/registration-purpose.entity';

export class CreateRegistrationPurposeDto extends OmitType(
  RegistrationPurposeEntity,
  ['id']
) {}
