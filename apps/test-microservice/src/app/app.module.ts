import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommonModule } from '../common/common.module';
import { TestPrismaModule } from '@edufin-back/test-prisma-client';
import { TestModule } from '../modules/test/test.module';
import { TestController } from '../modules/test/controllers/test.controller';
@Module({
  imports: [CommonModule, TestPrismaModule, TestModule],
  controllers: [AppController, TestController],
  providers: [AppService],
})
export class AppModule {}
