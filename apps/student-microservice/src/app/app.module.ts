import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommonModule } from '../common/common.module';
import { StudentPrismaModule } from '@edufin-back/student-prisma-client';
import { RegistrationModule } from '../modules/registration/registration.module';
import { RegistrationController } from '../modules/registration/controllers/registration.controller';
import { ExamController } from '../modules/exam/controllers/exam.controller';
import { ExamModule } from '../modules/exam/exam.module';

@Module({
  imports: [CommonModule, StudentPrismaModule, RegistrationModule, ExamModule],
  controllers: [AppController, RegistrationController, ExamController],
  providers: [AppService],
})
export class AppModule {}
