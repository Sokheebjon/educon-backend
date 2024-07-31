import { Module } from '@nestjs/common';
import { AuthModule } from '../../modules/auth/auth.module';
import { AuthController } from '../../modules/auth/auth.controller';

@Module({
  controllers: [AuthController],
  providers: [],
  exports: [],
  imports: [AuthModule],
})
export class RoutesAuthModule {}
