import {
  CreateVerificationDto,
  GetPersonalInfoExternalDto,
  UserLoginDto,
  VerifyVerificationDto,
} from '@edufin-back/shared/dto';
import { JwtPayload } from '@edufin-back/shared/types';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class AuthService implements OnModuleInit {
  constructor(
    @Inject('AUTH_MICROSERVICE') private readonly authClient: ClientKafka
  ) {}
  async onModuleInit() {
    await this.authClient.subscribeToResponseOf('login_user');
    await this.authClient.subscribeToResponseOf('authenticate');
    await this.authClient.subscribeToResponseOf('get_user_by_token');
    await this.authClient.subscribeToResponseOf(
      'send_verification_code_registration'
    );
    await this.authClient.subscribeToResponseOf(
      'verify_verification_code_registration'
    );
    await this.authClient.subscribeToResponseOf('get_personal_info_external');
    await this.authClient.connect();
  }

  loginUser(userLoginDto: UserLoginDto) {
    return this.authClient.send('login_user', JSON.stringify(userLoginDto));
  }
  sendVerificationCode(createVerification: CreateVerificationDto) {
    return this.authClient.send(
      'send_verification_code_registration',
      JSON.stringify(createVerification)
    );
  }
  verifyVerificationCode(verifyVerificationCode: VerifyVerificationDto) {
    return this.authClient.send(
      'verify_verification_code_registration',
      JSON.stringify(verifyVerificationCode)
    );
  }
  getUserByToken(currentUser: JwtPayload) {
    return this.authClient.send('get_user_by_token', currentUser);
  }
  getPersonalInfoExternal(
    getPersonalInfoExternalDto: GetPersonalInfoExternalDto
  ) {
    return this.authClient.send(
      'get_personal_info_external',
      getPersonalInfoExternalDto
    );
  }
}
