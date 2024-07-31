import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class RoleService implements OnModuleInit {
  constructor(
    @Inject('AUTH_MICROSERVICE') private readonly roleClient: ClientKafka
  ) {}
  async onModuleInit() {
    await this.roleClient.subscribeToResponseOf('get_roles');
    await this.roleClient.connect();
  }
  getRoles() {
    return this.roleClient.send('get_roles', JSON.stringify({}));
  }
}
