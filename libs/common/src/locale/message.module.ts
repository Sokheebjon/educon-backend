import { Global, Module } from '@nestjs/common';
import * as path from 'path';
import { I18nModule, HeaderResolver, I18nJsonLoader } from 'nestjs-i18n';
import { ENUM_MESSAGE_LANGUAGE } from '@edufin-back/shared/enum';

@Global()
@Module({
  providers: [],
  exports: [],
  imports: [
    I18nModule.forRootAsync({
      useFactory: () => ({
        fallbackLanguage: "en",
        fallbacks: Object.values(ENUM_MESSAGE_LANGUAGE).reduce(
          (a, v) => ({ ...a, [`${v}-*`]: v }),
          {}
        ),
        loaderOptions: {
          path: path.join('libs/common/src/locale/languages'),
          watch: true,
        },
      }),
      loader: I18nJsonLoader,
      resolvers: [new HeaderResolver(['x-custom-lang'])],
    }),
  ],
  controllers: [],
})
export class MessageModule {}
