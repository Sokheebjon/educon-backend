import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { CommonModule } from '../common/common.module';
import { AuthModule } from '../modules/auth/auth.module';
import { UserModule } from '../modules/user/user.module';
import { UserService } from '../modules/user/services/user.service';
import { UsersRepository } from '../modules/user/repositories/users.repository';
import {
  UserPrismaModule,
  UserPrismaService,
} from '@edufin-back/user-prisma-client';
import { AuthController } from '../modules/auth/auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { UserController } from '../modules/user/constrollers/user.controller';

@Module({
  controllers: [AuthController, UserController],
  providers: [UserService, UsersRepository, UserPrismaService],
  imports: [
    JwtModule.register({}),
    UserModule,
    CommonModule,
    UserPrismaModule,
    AuthModule,
  ],
})
export class AppModule {}
