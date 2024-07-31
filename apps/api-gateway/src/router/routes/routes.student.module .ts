import { Module } from '@nestjs/common';
import { RegistrationController } from '../../modules/student/modules/registration/registration.controller';
import { StudentModule } from '../../modules/student/student.module';
import { ExamController } from '../../modules/student/modules/exam/exam.controller';

@Module({
  controllers: [RegistrationController, ExamController],
  providers: [],
  exports: [],
  imports: [StudentModule],
})
export class RoutesStudentModule {}
