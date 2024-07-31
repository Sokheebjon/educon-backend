import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configs from '../configs';
import { MessageModule } from '@edufin-back/common/locale';
import { HelperModule } from '@edufin-back/common/helper-services';
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
    HelperModule
  ],
})
export class CommonModule {}
