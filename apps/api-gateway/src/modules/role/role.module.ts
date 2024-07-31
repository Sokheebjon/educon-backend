import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { RoleService } from './role.service';
@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'AUTH_MICROSERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'auth',
            brokers: ['localhost:9092'],
          },
          consumer: {
            groupId: 'api-role-consumer',
          },
        },
      },
    ]),
  ],
  exports: [RoleService],
  providers: [RoleService],
  controllers: [],
})
export class RoleModule {}
