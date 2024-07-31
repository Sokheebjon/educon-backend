import { registerAs } from '@nestjs/config';
import { seconds } from '../helper-services/constants/helper.function.constant';

export default registerAs(
  'auth',
  (): Record<string, unknown> => ({
    accessToken: {
      secretKey: process.env.AUTH_JWT_ACCESS_TOKEN_SECRET_KEY ?? '123456',
      expirationTime: seconds(
        process.env.AUTH_JWT_ACCESS_TOKEN_EXPIRED ?? '15m'
      ),
      encryptKey: process.env.AUTH_JWT_PAYLOAD_ACCESS_TOKEN_ENCRYPT_KEY,
      encryptIv: process.env.AUTH_JWT_PAYLOAD_ACCESS_TOKEN_ENCRYPT_IV,
    },

    refreshToken: {
      secretKey: process.env.AUTH_JWT_REFRESH_TOKEN_SECRET_KEY ?? '123456000',
      expirationTime: seconds(
        process.env.AUTH_JWT_REFRESH_TOKEN_EXPIRED ?? '7d'
      ), // recommendation for production is 7d
      expirationTimeRememberMe: seconds(
        process.env.AUTH_JWT_REFRESH_TOKEN_REMEMBER_ME_EXPIRED ?? '30d'
      ), // recommendation for production is 30d

      encryptKey: process.env.AUTH_JWT_PAYLOAD_REFRESH_TOKEN_ENCRYPT_KEY,
      encryptIv: process.env.AUTH_JWT_PAYLOAD_REFRESH_TOKEN_ENCRYPT_IV,
    },
    subject: process.env.AUTH_JWT_SUBJECT ?? 'nestDevelopment',
    audience: process.env.AUTH_JWT_AUDIENCE ?? 'https://example.com',
    issuer: process.env.AUTH_JWT_ISSUER ?? 'nest',
    prefixAuthorization:process.env.AUTH_JWT_PREFIX_AUTHORIZATION?? 'Bearer',
    password: {
      attempt: true,
      maxAttempt: 3,
      saltLength: 8,
      expiredIn: seconds('182d'), // recommendation for production is 182 days
    },
  })
);
