import { Module } from '@nestjs/common';
import { ExamService } from './services/exam.service';
import { ExamRepository } from './repository/exam.repository';
import { StudentPrismaModule } from '@edufin-back/student-prisma-client';
import { RegistrationModule } from '../registration/registration.module';
import { CatalogConnectorService } from '../../connector-services/catalog-connector.service';
import { TestConnectorService } from '../../connector-services/test-connector.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'TEST_MICROSERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'test',
            brokers: ['localhost:9092'],
          },
          consumer: {
            groupId: 'student-exam-test-consumer',
          },
        },
      },
    ]),
    StudentPrismaModule,
    RegistrationModule,
  ],
  providers: [
    ExamService,
    ExamRepository,
    CatalogConnectorService,
    TestConnectorService,
  ],
  exports: [
    ExamService,
    ClientsModule.register([
      {
        name: 'TEST_MICROSERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'test',
            brokers: ['localhost:9092'],
          },
          consumer: {
            groupId: 'student-exam-test-consumer',
          },
        },
      },
    ]),
  ],
})
export class ExamModule {}
