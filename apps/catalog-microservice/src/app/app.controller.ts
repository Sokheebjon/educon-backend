import { Controller, Get, Inject, OnModuleInit } from '@nestjs/common';

import { AppService } from './app.service';
import { ClientKafka } from '@nestjs/microservices';
@Controller()
export class AppController implements OnModuleInit {
  constructor(
    @Inject('AUTH_MICROSERVICE') private readonly authClient: ClientKafka,
    private readonly appService: AppService
  ) {}
  async onModuleInit() {
    await this.authClient.subscribeToResponseOf('findOne_user');
    await this.authClient.connect();
  }
  @Get()
  getData() {
    return this.appService.getData();
  }
}
