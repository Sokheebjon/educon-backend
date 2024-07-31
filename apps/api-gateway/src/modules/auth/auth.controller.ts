import {
  Body,
  Controller,
  Get,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import {  CreateVerificationDto, GetPersonalInfoExternalDto, UserLoginDto, VerifyVerificationDto } from '@edufin-back/shared/dto';
import { ConfigService } from '@nestjs/config';
import { I18nService } from 'nestjs-i18n';
import { ApiTags } from '@nestjs/swagger';
import { CurrentUser, Public } from '@edufin-back/common/decorators';
import { JwtPayload } from '@edufin-back/shared/types';
@ApiTags('Auth')
@Controller()
export class AuthController {
  constructor(
    private readonly configService: ConfigService,
    private readonly i18n: I18nService,
    private readonly authService: AuthService
  ) {}


  @Public()
  @Post('login')
  async cloginUser(@Body(ValidationPipe) userLoginDto: UserLoginDto) {
    return await this.authService.loginUser(userLoginDto);
  }

  @Public()
  @Post('send-registration-otp')
  async sendVerificationCode(@Body() createVerification:CreateVerificationDto ) {
    return await this.authService.sendVerificationCode(createVerification);
  }
  @Public()
  @Post('verify-registration-otp')
  async verifyVerificationCode(@Body() verifyVerificationCode:VerifyVerificationDto ) {
    return await this.authService.verifyVerificationCode(verifyVerificationCode);
  }

  @Get("info")
  async getUserByToken(@CurrentUser() currentUser:JwtPayload){
    return await this.authService.getUserByToken(currentUser)
  }
  @Post("get-personal-info")
  async getPersonalInfo(@Body() getPersonalInfoExternalDto:GetPersonalInfoExternalDto){
    return await this.authService.getPersonalInfoExternal(getPersonalInfoExternalDto)
  }

  
  
}
