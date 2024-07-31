import { registerAs } from '@nestjs/config';
import { APP_LANGUAGE } from '@edufin-back/shared/constants';
import { ENUM_MESSAGE_LANGUAGE } from '@edufin-back/shared/enum';

export default registerAs(
  'message',
  (): Record<string, unknown> => ({
    availableLanguage: Object.values(ENUM_MESSAGE_LANGUAGE),
    language: process.env.APP_LANGUAGE ?? APP_LANGUAGE,
  })
);
