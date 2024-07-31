import { Controller, UseGuards } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UserService } from '../user/services/user.service';
import {
  CreateVerificationDto,
  GetPersonalInfoExternalDto,
  UserLoginDto,
  VerifyVerificationDto,
} from '@edufin-back/shared/dto';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { handleAsyncOperation } from '@edufin-back/common';

@Controller()
export class AuthController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern('login_user')
  handleGetUser(@Payload() userLoginDto: UserLoginDto) {
    return this.userService.login(userLoginDto);
  }
  @MessagePattern('send_verification_code_registration')
  sendRegistrationVerificationCode(
    @Payload() createVerification: CreateVerificationDto
  ) {
    return this.userService.sendRegistrationVerificationCode(
      createVerification
    );
  }
  @MessagePattern('send_verification_code')
  sendVerificationCode(@Payload() createVerification: CreateVerificationDto) {
    return this.userService.createVerification(createVerification.phoneNumber);
  }
  @MessagePattern('verify_verification_code_registration')
  verifyRegistrationVerificationCode(
    @Payload() verifyVerificationCode: VerifyVerificationDto
  ) {
    return this.userService.verifyRegistrationVerificationCode(
      verifyVerificationCode
    );
  }
  @MessagePattern('verify_verification_code')
  verifyVerificationCode(
    @Payload() verifyVerificationCode: VerifyVerificationDto
  ) {
    return this.userService.verifyVerification(
      verifyVerificationCode.id,
      verifyVerificationCode?.code
    );
  }
  @MessagePattern('get_personal_info_external')
  async getPersonalInfoExternal(@Payload()  getPersonalInfoExternalDto: GetPersonalInfoExternalDto) {
    return await handleAsyncOperation(this.userService.getPersonalInfoExternal(getPersonalInfoExternalDto))
  }
  @UseGuards(JwtAuthGuard)
  @MessagePattern('authenticate')
  async authenticate(@Payload() data: any) {
    return data?.user;
  }
}
