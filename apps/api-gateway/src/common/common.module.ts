import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import Joi from 'joi';
import configs from '../configs';
import { MessageModule } from '@edufin-back/common/locale';
import { ENUM_APP_ENVIRONMENT } from '@edufin-back/shared/enum';
@Module({
  controllers: [],
  providers: [],
  imports: [
    ConfigModule.forRoot({
      load: configs,
      isGlobal: true,
      cache: true,
      envFilePath: ['.env'],
      expandVariables: true,
      validationSchema: Joi.object({
        APP_NAME: Joi.string().required() ?? 'relik',
        APP_ENV: Joi.string()
          .valid(...Object.values(ENUM_APP_ENVIRONMENT))
          .default('development')
          .required(),
        HTTP_PORT: Joi.number().default(3000).required(),
      }),
      validationOptions: {
        allowUnknown: true,
        abortEarly: true,
      },
    }),
    MessageModule,
  ],
})
export class CommonModule {}
