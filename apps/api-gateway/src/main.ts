
import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import swaggerInit from './swagger';
import { AppModule } from './app/app.module';
import {  GlobalExceptionFilter } from '@edufin-back/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  const port = process.env.HTTP_PORT|| 3333;
    // Swagger
  await swaggerInit(app);
  app.enableCors()
  app.useGlobalFilters(new GlobalExceptionFilter());
  app.useGlobalPipes(new ValidationPipe());
  
  await app.listen(port);
  Logger.log(
    `🚀 API GATEWAY is running`
  );
}

bootstrap();
