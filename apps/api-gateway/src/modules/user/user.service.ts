import { CreateUserDto } from '@edufin-back/shared/dto';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class UserService implements OnModuleInit {
  constructor(
    @Inject('AUTH_MICROSERVICE') private readonly authClient: ClientKafka
  ) {}
  async onModuleInit() {
    await this.authClient.subscribeToResponseOf('create_user');
    await this.authClient.subscribeToResponseOf('findAll_user');
    await this.authClient.connect();
  }
  createUser(createUserDto: CreateUserDto) {
    return this.authClient.send('create_user', JSON.stringify(createUserDto));
  }
  findAll() {
    return this.authClient.send('findAll_user', {});
  }
}
