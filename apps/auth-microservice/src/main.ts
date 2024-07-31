import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app/app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
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
          groupId: 'auth-consumer',
        
        },
      },
    }
  );


  app.useGlobalFilters(new RpcValidationFilter());
  app.useGlobalPipes(new ValidationPipe());
  await app.listen();
  Logger.log(
    `🚀 AUTH MICRESERVICE is running`
  );
  
}

bootstrap();
