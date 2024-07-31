import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import {
  HelperDateService,
  HelperEncryptionService,
  HelperHashService,
} from '@edufin-back/common/helper-services';
import {
  IAuthPassword,
  IAuthRefreshTokenOptions,
} from '../../interfaces/auth.interface';

@Injectable()
//IAuthService
export class AuthService {
  private readonly accessTokenSecretKey: string;
  private readonly accessTokenExpirationTime: number;
  private readonly accessTokenEncryptKey: string;
  private readonly accessTokenEncryptIv: string;

  private readonly refreshTokenSecretKey: string;
  private readonly refreshTokenExpirationTime: number;
  private readonly refreshTokenExpirationTimeRememberMe: number;
  private readonly refreshTokenEncryptKey: string;
  private readonly refreshTokenEncryptIv: string;

  private readonly audience: string;
  private readonly issuer: string;
  private readonly subject: string;

  private readonly passwordExpiredIn: number;

  constructor(
    private readonly helperHashService: HelperHashService,
    private readonly helperDateService: HelperDateService,
    private readonly helperEncryptionService: HelperEncryptionService,
    private readonly configService: ConfigService
  ) {
    this.accessTokenSecretKey = this.configService.get<string>(
      'auth.accessToken.secretKey'
    );
    this.accessTokenExpirationTime = this.configService.get<number>(
      'auth.accessToken.expirationTime'
    );

    this.accessTokenEncryptKey = this.configService.get<string>(
      'auth.accessToken.encryptKey'
    );
    this.accessTokenEncryptIv = this.configService.get<string>(
      'auth.accessToken.encryptIv'
    );

    this.refreshTokenSecretKey = this.configService.get<string>(
      'auth.refreshToken.secretKey'
    );
    this.refreshTokenExpirationTime = this.configService.get<number>(
      'auth.refreshToken.expirationTime'
    );
    this.refreshTokenExpirationTimeRememberMe = this.configService.get<number>(
      'auth.refreshToken.expirationTimeRememberMe'
    );

    this.refreshTokenEncryptKey = this.configService.get<string>(
      'auth.refreshToken.encryptKey'
    );
    this.refreshTokenEncryptIv = this.configService.get<string>(
      'auth.refreshToken.encryptIv'
    );

    this.subject = this.configService.get<string>('auth.subject');
    this.audience = this.configService.get<string>('auth.audience');
    this.issuer = this.configService.get<string>('auth.issuer');

    this.passwordExpiredIn = this.configService.get<number>(
      'auth.password.expiredIn'
    );
  }

  async createSalt(length: number): Promise<string> {
    return this.helperHashService.randomSalt(length);
  }

  async encryptAccessToken(payload: Record<string, any>): Promise<string> {
    return this.helperEncryptionService.aes256Encrypt(
      payload,
      this.accessTokenEncryptKey,
      this.accessTokenEncryptIv
    );
  }

  async decryptAccessToken({
    data,
  }: Record<string, any>): Promise<Record<string, any>> {
    return this.helperEncryptionService.aes256Decrypt(
      data,
      this.accessTokenEncryptKey,
      this.accessTokenEncryptIv
    ) as Record<string, any>;
  }

  async createAccessToken(payloadHashed: Record<string, any>): Promise<string> {
    return this.helperEncryptionService.jwtEncrypt(
      { data: payloadHashed },
      {
        secretKey: this.accessTokenSecretKey,
        expiredIn: this.accessTokenExpirationTime,
        audience: this.audience,
        issuer: this.issuer,
        subject: this.subject,
      }
    );
  }

  async validateAccessToken(token: string): Promise<boolean> {
    return this.helperEncryptionService.jwtVerify(token, {
      secretKey: this.accessTokenSecretKey,
      audience: this.audience,
      issuer: this.issuer,
      subject: this.subject,
    });
  }

  async encryptRefreshToken(payload: Record<string, any>): Promise<string> {
    return this.helperEncryptionService.aes256Encrypt(
      payload,
      this.refreshTokenEncryptKey,
      this.refreshTokenEncryptIv
    );
  }

  async decryptRefreshToken({
    data,
  }: Record<string, any>): Promise<Record<string, any>> {
    return this.helperEncryptionService.aes256Decrypt(
      data,
      this.refreshTokenEncryptKey,
      this.refreshTokenEncryptIv
    ) as Record<string, any>;
  }

  async createRefreshToken(
    payloadHashed: string | Record<string, any>,
    options?: IAuthRefreshTokenOptions
  ): Promise<string> {
    return this.helperEncryptionService.jwtEncrypt(
      { data: payloadHashed },
      {
        secretKey: this.refreshTokenSecretKey,
        expiredIn: options?.rememberMe
          ? this.refreshTokenExpirationTimeRememberMe
          : this.refreshTokenExpirationTime,

        audience: this.audience,
        issuer: this.issuer,
        subject: this.subject,
      }
    );
  }

  async validateRefreshToken(token: string): Promise<boolean> {
    return this.helperEncryptionService.jwtVerify(token, {
      secretKey: this.refreshTokenSecretKey,
      audience: this.audience,
      issuer: this.issuer,
      subject: this.subject,
    });
  }

  async validateUser(
    passwordString: string,
    passwordHash: string
  ): Promise<boolean> {
    return this.helperHashService.bcryptCompare(passwordString, passwordHash);
  }

  async createPassword(password: string): Promise<IAuthPassword> {
    const salt: string = this.helperHashService.randomSalt(10);
    const passwordExpired: Date = this.helperDateService.forwardInSeconds(
      this.passwordExpiredIn
    );

    const passwordCreated: Date = this.helperDateService.create();
    const passwordHash = this.helperHashService.bcrypt(password, salt);

    return {
      passwordHash,
      passwordExpired,
      passwordCreated,
      salt,
    };
  }

  async checkPasswordExpired(passwordExpired: Date): Promise<boolean> {
    const today: Date = this.helperDateService.create();
    const passwordExpiredConvert: Date =
    this.helperDateService.create(passwordExpired);

    return today > passwordExpiredConvert;
  }
}
