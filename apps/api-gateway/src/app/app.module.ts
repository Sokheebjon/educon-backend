import { Module } from '@nestjs/common';
import { RouterModule } from '../router/router.module';
import { CommonModule } from '../common/common.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from '../modules/auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { JwtAuthGuard } from '@edufin-back/common';

@Module({
  controllers: [],
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
            groupId: 'auth-consumer',
          },
        },  
      },
    ]),
    ConfigModule,
    CommonModule,
    AuthModule,
    // Routes
    RouterModule.forRoot(),
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
