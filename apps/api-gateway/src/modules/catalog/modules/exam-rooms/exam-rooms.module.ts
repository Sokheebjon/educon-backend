import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ExamRoomsService } from './exam-rooms.service';


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
  exports: [ExamRoomsService],
  providers: [ExamRoomsService],
  controllers: [],
})
export class ExamRoomsModule {}
