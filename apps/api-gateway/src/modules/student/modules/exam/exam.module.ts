import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ExamService } from './exam.service';

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
  ],
  exports: [ExamService],
  providers: [ExamService],
  controllers: [],
})
export class ExamModule {}
