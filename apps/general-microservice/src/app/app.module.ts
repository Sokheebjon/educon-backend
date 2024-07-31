import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GeneralPrismaModule } from '@edufin-back/general-prisma-client';
import { CommonModule } from '../common/common.module';
import { SmsModule } from '../modules/sms/sms.module';
import { SmsController } from '../modules/sms/controllers/sms.controller';

@Module({
  imports: [CommonModule, GeneralPrismaModule, SmsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
