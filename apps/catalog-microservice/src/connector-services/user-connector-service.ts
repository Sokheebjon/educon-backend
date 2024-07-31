import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

  @Injectable()
  export class UserConnectorService {
    constructor(
      @Inject('AUTH_MICROSERVICE') private readonly userClient: ClientKafka
    ) {}

    async getUserById(id: string) {
      const response$ = this.userClient.send(
        'findOne_user',
        JSON.stringify({
          id,
        })
      );

      const response = await firstValueFrom(response$);
      return response;
    }
  }
