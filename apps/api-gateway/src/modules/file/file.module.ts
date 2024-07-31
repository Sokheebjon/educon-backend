import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { FileService } from './file.service';
@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'FILE_MICROSERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'file',
            brokers: ['localhost:9092'],
          },
          consumer: {
            groupId: 'api-file-consumer',
          },
        },
      },
    ]),
  ],
  exports: [FileService],
  providers: [FileService],
  controllers: [],
})
export class FileModule {}
