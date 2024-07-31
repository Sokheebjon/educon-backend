import { Module } from '@nestjs/common';
import { SmsController } from '../../modules/sms/sms.controller';
import { SmsModule } from '../../modules/sms/sms.module';

@Module({
  controllers: [SmsController],
  providers: [],
  exports: [],
  imports: [SmsModule],
})
export class RoutesSmsModule {}
