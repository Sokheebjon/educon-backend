import { Controller } from '@nestjs/common';

import { AppService } from './app.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { IParsedFile } from '@edufin-back/shared/interfaces';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern('create_file')
  create(@Payload() payload: { file: IParsedFile }) {
    return this.appService.create(payload.file);
  }
  @MessagePattern('findOne_file')
  findOne(@Payload() payload: { idOrPath: string }) {
    return this.appService.findOne(payload?.idOrPath);
  }
  @MessagePattern('findOne_file-info')
  findOneWithInfo(@Payload() payload: { idOrPath: string }) {
    return this.appService.findOneWithInfo(payload?.idOrPath);
  }
  @MessagePattern('delete_file')
  delete(@Payload() payload: { idOrPath: string }) {
    return this.appService.delete(payload?.idOrPath);
  }
}
