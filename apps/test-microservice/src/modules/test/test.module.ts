import { Module } from '@nestjs/common';

import { TestService } from './services/test.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { CommonModule } from '../../common/common.module';
import { TestPrismaModule } from '@edufin-back/test-prisma-client';
import { TestRepository } from './repository/test.repository';
import { CatalogConnectorService } from './services/catalog-connector.service';
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
            groupId: 'test-consumer',
          },
        },
      },
      {
        name: 'CATALOG_MICROSERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'catalog',
            brokers: ['localhost:9092'],
          },
          consumer: {
            groupId: 'test-catalog-consumer',
          },
        },
      },
    ]),

    CommonModule,
    TestPrismaModule,
  ],
  controllers: [],
  providers: [TestService, TestRepository, CatalogConnectorService],
  exports: [TestService, TestRepository, CatalogConnectorService],
})
export class TestModule {}
