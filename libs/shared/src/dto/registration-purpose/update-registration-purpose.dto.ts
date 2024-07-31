import { PartialType } from '@nestjs/swagger';
import {  CreateRegistrationPurposeDto } from './create-registration-purpose.dto';

export class UpdateRegistrationPurposeDto extends PartialType(
  CreateRegistrationPurposeDto
) {}
