import { Module } from '@nestjs/common';
import { UserController } from '../../modules/user/user.controller';
import { UserModule } from '../../modules/user/user.module';

@Module({
  controllers: [UserController],
  providers: [],
  exports: [],
  imports: [UserModule],
})
export class RoutesUserModule {}
