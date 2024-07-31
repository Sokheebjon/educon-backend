import {
  CreateVerificationDto,
  VerifyVerificationDto,
} from '@edufin-back/shared/dto';
import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AuthConnectorService {
  constructor(
    @Inject('AUTH_MICROSERVICE') private readonly authClient: ClientKafka
  ) {}
  async   sendVerificationCode(createVerification: CreateVerificationDto) {
    const verification_id = await this.authClient.send(
      'send_verification_code',
      {phoneNumber:createVerification?.phoneNumber}
    );
    return await firstValueFrom(verification_id);
  }
  async verifydVerificationCode(verifyVerificationCode: VerifyVerificationDto) {
    const token = await this.authClient.send(
      'verify_verification_code',
      { verifyVerificationCode }
    );
    return await firstValueFrom(token);
  }
}
