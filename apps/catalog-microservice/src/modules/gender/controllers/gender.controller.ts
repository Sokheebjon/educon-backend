import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { GenderService } from '../services/gender.service';

@Controller()
export class GenderController {
  constructor(private readonly genderService: GenderService) {}
  @MessagePattern('get_catalog_gender')
  get() {
    return this.genderService.findAll();
  }

  @MessagePattern('findOne_catalog_gender')
  getOne(@Payload() payload: { id }) {
    return this.genderService.findOne(payload?.id);
  }
}
