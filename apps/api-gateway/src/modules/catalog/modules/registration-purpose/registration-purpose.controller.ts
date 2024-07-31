import { Controller } from '@nestjs/common';
import { buildController } from '@edufin-back/common/abstract';
import {
  CreateRegistrationPurposeDto,
  UpdateRegistrationPurposeDto,
} from '@edufin-back/shared/dto';
import { RegistrationPurposeService } from './registration-purpose.service';
import { RegistrationPurposeEntity } from '@edufin-back/shared/entities';

const BaseController = buildController({
  createDto: CreateRegistrationPurposeDto,
  model: RegistrationPurposeEntity,
  name: 'Registration Purpose',
  updateDto: UpdateRegistrationPurposeDto,
});
@Controller('registration-purpose')
export class RegistrationPurposeController extends BaseController {
  constructor(
    private readonly registrationPurposeService: RegistrationPurposeService
  ) {
    super(registrationPurposeService);
  }
}
