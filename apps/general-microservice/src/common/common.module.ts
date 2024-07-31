import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configs from '../configs';
import { MessageModule } from '@edufin-back/common/locale';
@Module({
  controllers: [],
  providers: [],
  imports: [
    ConfigModule.forRoot({
      load: configs,
      isGlobal: true,
      envFilePath: ['.env'],
      expandVariables: true,
    }),
    MessageModule,
  ],
})
export class CommonModule {}
