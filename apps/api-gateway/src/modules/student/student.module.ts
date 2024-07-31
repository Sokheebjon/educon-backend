import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { StudentService } from './student.service';
import { RegistrationModule } from './modules/registration/registration.module';
import { RegistrationService } from './modules/registration/registration.service';
import { ExamService } from './modules/exam/exam.service';
import { ExamModule } from './modules/exam/exam.module';
@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'STUDENT_MICROSERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'student',
            brokers: ['localhost:9092'],
          },
          consumer: {
            groupId: 'api-student-consumer',
          },
        },
      },
    ]),
    RegistrationModule,
    ExamModule
  ],
  exports: [RegistrationService, ExamService],
  providers: [StudentService,RegistrationService, ExamService],
  controllers: [],
})
export class StudentModule {}
