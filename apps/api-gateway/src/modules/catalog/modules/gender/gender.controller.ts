import { Controller, Get, Param } from '@nestjs/common';

import { ApiTags } from '@nestjs/swagger';
import { GenderService } from './gender.service';
import { Public } from '@edufin-back/common/decorators';

@ApiTags('Gender')
@Controller('gender')
export class GenderController {
  constructor(private readonly genderService: GenderService) {}
  @Public()
  @Get()
  findAll() {
    return this.genderService.findAll();
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.genderService.findOne(id);
  }
}
