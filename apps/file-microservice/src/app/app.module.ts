import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommonModule } from '../common/common.module';
import { GeneralPrismaModule } from '@edufin-back/general-prisma-client';

@Module({
  imports: [
    CommonModule,
    GeneralPrismaModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
