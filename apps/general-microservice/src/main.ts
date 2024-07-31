/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import {  Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { RpcValidationFilter } from '@edufin-back/common';

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
          groupId: 'general-consumer',
        },
      },
    }
  );
  app.useGlobalFilters(new RpcValidationFilter());
  app.useGlobalPipes(new ValidationPipe());
  await app.listen();
  Logger.log(
    `🚀 GENERAL MICRESERVICE is running`
  );
}

bootstrap();
