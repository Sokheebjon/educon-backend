import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { RpcValidationFilter } from '@edufin-back/common';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.KAFKA,
      options: {
        client: {
          brokers: ['localhost:9092'],
        },
        consumer: {
          groupId: 'test-consumer',
        },
      },
    }
  );
  app.useGlobalFilters(new RpcValidationFilter());
  app.useGlobalPipes(new ValidationPipe());
  await app.listen();
  Logger.log(
    `🚀 TEST MICRESERVICE is running`
  );
}

bootstrap();
