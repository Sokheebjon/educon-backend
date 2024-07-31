import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { SmsService } from './sms.service';
@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'GENERAL_MICROSERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'general',
            brokers: ['localhost:9092'],
          },
          consumer: {
            groupId: 'api-general-consumer',
          },
        },
      },
    ]),
  ],
  exports: [SmsService],
  providers: [SmsService],
  controllers: [],
})
export class SmsModule {}
