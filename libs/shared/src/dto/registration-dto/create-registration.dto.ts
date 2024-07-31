import { PickType } from '@nestjs/swagger';
import { RegistrationEntity } from '../../entities/registration.entity';

export class CreateRegistrationDto extends PickType(RegistrationEntity, [
  'primary_phone',
]) {}
