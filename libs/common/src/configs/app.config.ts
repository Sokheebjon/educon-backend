import { ENUM_APP_ENVIRONMENT } from '@edufin-back/shared/enum';
import { registerAs } from '@nestjs/config';

export default registerAs(
  'app',
  (): Record<string, unknown> => ({
    name: process.env.APP_NAME ?? 'albison',
    env: process.env.APP_ENV ?? ENUM_APP_ENVIRONMENT.DEVELOPMENT,
    client_host: process.env.CLIENT_HOST,
    client_host_regidtration: process.env.CLIENT_HOST_REGISRATION,
    university_name: process.env.UNIVERSITY_NAME,
    versioning: {
      enable: process.env.HTTP_VERSIONING_ENABLE === 'true' ?? false,
      prefix: 'v',
      version: process.env.HTTP_VERSION ?? '1',
    },

    globalPrefix: '/',
    http: {
      host: process.env.HTTP_HOST ?? 'localhost',
      port: process.env.HTTP_PORT
        ? Number.parseInt(process.env.HTTP_PORT)
        : 5000,
    },
    jobEnable: process.env.JOB_ENABLE === 'true' ?? false,
  })
);
