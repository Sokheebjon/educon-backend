import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { RegistrationPurposeService } from '../services/registration-purpose.service';
import {
  CreateRegistrationPurposeDto,
  GetResourceDto,
  UpdateRegistrationPurposeDto,
} from '@edufin-back/shared/dto';

@Controller()
export class RegistrationPurposeController {
  constructor(
    private readonly registrationPurposeService: RegistrationPurposeService
  ) {}
  @MessagePattern('get_catalog_registration_purpose')
  get() {
    return this.registrationPurposeService.findAll();
  }

  @MessagePattern('create_catalog_registration_purpose')
  create(
    @Payload() createRegistrationPurposeDto: CreateRegistrationPurposeDto
  ) {
    return this.registrationPurposeService.create(createRegistrationPurposeDto);
  }
  @MessagePattern('update_catalog_registration_purpose')
  update(
    @Payload()
    payload: {
      id: string;
      updateRegistrationPurposeDto: UpdateRegistrationPurposeDto;
    }
  ) {
    return this.registrationPurposeService.update(
      payload?.id,
      payload?.updateRegistrationPurposeDto
    );
  }
  @MessagePattern('remove_catalog_registration_purpose')
  remove(@Payload() payload: { id: string }) {
    return this.registrationPurposeService.remove(payload?.id);
  }
  @MessagePattern('getResource_catalog_registration_purpose')
  getResource(@Payload() getResourceDto: GetResourceDto) {
    return this.registrationPurposeService.getResource(
      +getResourceDto?.page,
      +getResourceDto?.take,
      getResourceDto?.include,
      getResourceDto?.where
    );
  }
  @MessagePattern('findOne_catalog_registration_purpose')
  getOne(@Payload() payload: { id; include }) {
    return this.registrationPurposeService.findOne(
      payload?.id,
      payload?.include
    );
  }
}
