import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TestService } from './test.service';
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
            groupId: 'api-test-consumer',
          },
        },
      },
    ]),
  ],
  exports: [TestService],
  providers: [TestService],
  controllers: [],
})
export class TestModule {}
