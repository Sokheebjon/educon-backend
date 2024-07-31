import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import PersonalSmsService from './personal-info.service';

@Module({
  providers: [PersonalSmsService],
  exports: [PersonalSmsService],
  imports: [HttpModule],
})
export default class PersonalInfoModule {}
