import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import {  EducationDirectionService } from './education-direction.service';

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
  exports: [EducationDirectionService],
  providers: [EducationDirectionService],
  controllers: [],
})
export class EducationDirectionModule {}
