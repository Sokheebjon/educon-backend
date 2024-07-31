import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { GenderService } from './gender.service';

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
            groupId: 'api-catalog-consumer',
          },
        },  
      },
    ]),
  ],
  exports: [GenderService],
  providers: [GenderService],
  controllers: [],
})
export class GenderModule {}
