import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthJwtAccessStrategy } from '../../strategies/auth.jwt-access.strategy';
import { AuthJwtRefreshStrategy } from '../../strategies/auth.jwt-refresh.strategy';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { JwtModule } from '@nestjs/jwt';

@Module({
  providers: [AuthService, AuthJwtAccessStrategy, AuthJwtRefreshStrategy],
  exports: [AuthService],
  controllers: [],
  imports: [
    JwtModule.register({}),
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
            groupId: 'auth-consumer',
          },
        },
      },
    ]),
  ],
})
export class AuthModule {}
