import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import GeneralSmsService from './general-sms.service';

@Module({
  providers: [GeneralSmsService],
  exports: [GeneralSmsService],
  imports: [HttpModule],
})
export default class GeneralSmsModule {}
