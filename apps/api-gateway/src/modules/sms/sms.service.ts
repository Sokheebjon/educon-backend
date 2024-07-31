
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class SmsService implements OnModuleInit {
  constructor(
    @Inject('GENERAL_MICROSERVICE') private readonly generalClient: ClientKafka
  ) {}
  async onModuleInit() {
    this.generalClient.subscribeToResponseOf('create_sms');
    this.generalClient.subscribeToResponseOf('getResource_sms');
    await this.generalClient.connect();
  }

  async createBatchSms(createSmsDto) {
    return await this.generalClient.send(
      'create_sms',
      JSON.stringify({ createSmsDto })
    );
  }

  async getResource(page, take) {
    return await this.generalClient.send(
      'getResource_sms',
      JSON.stringify({ page, take })
    );
  }
}
