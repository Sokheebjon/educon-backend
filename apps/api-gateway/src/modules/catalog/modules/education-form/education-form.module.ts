import { Module } from '@nestjs/common';
import { EducationFormService } from './education-form.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

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
  exports: [EducationFormService],
  providers: [EducationFormService],
  controllers: [],
})
export class EducationFormModule {}
