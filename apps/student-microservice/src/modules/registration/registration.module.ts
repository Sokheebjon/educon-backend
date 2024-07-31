import { Module } from '@nestjs/common';
import { RegistrationService } from './services/registration.service';
import { RegistrationRepository } from './repository/registration.repository';
import { StudentPrismaModule } from '@edufin-back/student-prisma-client';
import { CatalogConnectorService } from '../../connector-services/catalog-connector.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { GeneralSmsModule } from '@edufin-back/common/services';
import { FileConnectorService } from '../../connector-services/file-connector.service';
import { AuthConnectorService } from '../../connector-services/auth-connector.service';
import { CrmIntegrationService } from './services/crm-integration.service';
import { TestConnectorService } from '../../connector-services/test-connector.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'CATALOG_MICROSERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'catalog',
            brokers: ['localhost:9092'],
          },
          consumer: {
            groupId: 'student-catalog-consumer',
          },
        },
      },
      {
        name: 'FILE_MICROSERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'file',
            brokers: ['localhost:9092'],
          },
          consumer: {
            groupId: 'student-file-consumer',
          },
        },
      },
      {
        name: 'AUTH_MICROSERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'auth',
            brokers: ['localhost:9092'],
          },
          consumer: {
            groupId: 'student-auth-consumer',
          },
        },
      },
      {
        name: 'TEST_MICROSERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'test',
            brokers: ['localhost:9092'],
          },
          consumer: {
            groupId: 'student-registarrion-test-consumer',
          },
        },
      },
    ]),
    StudentPrismaModule,
    GeneralSmsModule,
  ],
  providers: [
    RegistrationService,
    RegistrationRepository,
    CatalogConnectorService,
    FileConnectorService,
    AuthConnectorService,
    CrmIntegrationService,
    TestConnectorService
  ],
  exports: [
    RegistrationService,
    RegistrationRepository,
    ClientsModule.register([
      {
        name: 'CATALOG_MICROSERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'catalog',
            brokers: ['localhost:9092'],
          },
          consumer: {
            groupId: 'student-catalog-consumer',
          },
        },
      },
      {
        name: 'FILE_MICROSERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'file',
            brokers: ['localhost:9092'],
          },
          consumer: {
            groupId: 'student-file-consumer',
          },
        },
      },
      {
        name: 'AUTH_MICROSERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'auth',
            brokers: ['localhost:9092'],
          },
          consumer: {
            groupId: 'student-auth-consumer',
          },
        },
      },
      {
        name: 'TEST_MICROSERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'test',
            brokers: ['localhost:9092'],
          },
          consumer: {
            groupId: 'student-registarrion-test-consumer',
          },
        },
      },
    ]),
  ],
})
export class RegistrationModule {}
