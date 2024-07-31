import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { SmsService } from './sms.service';
import { CreateSmsDto, GetResourceSmsDto } from '@edufin-back/shared/dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('SMS API')
@Controller()
export class SmsController {
  constructor(private readonly smsService: SmsService) {}

  @Post('batch')
  createBatchSms(@Body() createSmsDto: CreateSmsDto) {
    return this.smsService.createBatchSms(createSmsDto);
  }
  @Get('get-resource')
  async getResource(@Query() getResourceSmsDto: GetResourceSmsDto) {
    return this.smsService.getResource(
      +getResourceSmsDto?.page,
      +getResourceSmsDto?.take
    );
  }
}
