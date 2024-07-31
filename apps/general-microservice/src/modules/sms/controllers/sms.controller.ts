import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateSmsDto } from '@edufin-back/shared/dto';
import { SmsService } from '../services/sms.service';


@Controller()
export class SmsController {
  constructor(private readonly smsService: SmsService) {}

  @MessagePattern("create_sms")
  createBatchSms(@Payload() payload:{createSmsDto:CreateSmsDto}) {
    return this.smsService.createBatchSms(payload?.createSmsDto);
  }
  @MessagePattern("getResource_sms")
  getResource(@Payload() payload:{page,take}) {
    return this.smsService.getResource(payload?.page, payload?.take);
  }
}
