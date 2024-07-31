import { Module } from '@nestjs/common';

import { GeneralPrismaModule } from '@edufin-back/general-prisma-client';
import { CommonModule } from '../../common/common.module';
import { SmsController } from './controllers/sms.controller';
import { SmsService } from './services/sms.service';
import { GeneralSmsModule } from '@edufin-back/common/services';

@Module({
  imports: [CommonModule, GeneralPrismaModule, GeneralSmsModule],
  controllers: [SmsController],
  providers: [SmsService],
})
export class SmsModule {}
