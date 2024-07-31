import {
  BadRequestException,
  ForbiddenException,
  Inject,
  Injectable,
  OnModuleInit,
} from '@nestjs/common';
import { UsersRepository } from '../repositories/users.repository';
import {
  CreateUserDto,
  CreateVerificationDto,
  GetPersonalInfoExternalDto,
  UserLoginDto,
  VerifyVerificationDto,
} from '@edufin-back/shared/dto';
import { AuthService } from '../../auth/auth.service';
import { UserEntity } from '@edufin-back/shared/entities';
import { JwtPayload, Tokens } from '@edufin-back/shared/types';
import { ClientKafka, RpcException } from '@nestjs/microservices';
import {
  GeneralSmsService,
  PersonalInfoService,
} from '@edufin-back/common/services';
import { StudentConnectorService } from '../../../connector-services/student-connector.service';
import { handleAsyncOperation } from '@edufin-back/common';
@Injectable()
// TODO write interface for  this class. Furqat
export class UserService implements OnModuleInit {
  constructor(
    @Inject('STUDENT_MICROSERVICE') private readonly studentClient: ClientKafka,
    private readonly authService: AuthService,
    private readonly userRepository: UsersRepository,
    private readonly studentConnector: StudentConnectorService,
    private readonly generalSmsService: GeneralSmsService,
    private readonly personalInfoService: PersonalInfoService
  ) {}
  async onModuleInit() {
    this.studentClient.subscribeToResponseOf(
      'find_registartion_by_phone_number'
    );
    this.studentClient.subscribeToResponseOf('create_student_registration');
    await this.studentClient.connect();
  }
  //Auth related

  async isUserExist(phoneNumber: string): Promise<UserEntity | undefined> {
    return await handleAsyncOperation(this.userRepository.findByPhoneNumber(phoneNumber));
  }
  async getTokens(userId: string, phoneNumber: string): Promise<Tokens> {
    const jwtPayload: JwtPayload = {
      sub: userId,
      phoneNumber: phoneNumber,
    };

    const [at, rt] = await Promise.all([
      this.authService.createAccessToken(jwtPayload),
      this.authService.createRefreshToken(jwtPayload),
    ]);

    return {
      access_token: at,
      refresh_token: rt,
    };
  }
  async getUserByToken(payload: JwtPayload) {
    return await handleAsyncOperation(this.userRepository.findOne(payload.sub))
  }

  async getRoles() {
    return await handleAsyncOperation(this.userRepository.getRoles());
  }
  async refreshTokens(userId: string): Promise<Tokens> {
    const user = await this.userRepository.findById(userId);
    if (!user) throw new ForbiddenException('Access Denied');

    const tokens = await this.getTokens(user.id, user.phoneNumber);
    return tokens;
  }
  async createUser(userData: CreateUserDto) {
    try {
      const password = await this.authService.createPassword(
        userData?.password ? userData.password : userData?.phoneNumber
      );

      return await handleAsyncOperation(this.userRepository.create({
        firstName: userData.firstName,
        lastName: userData.lastName,
        phoneNumber: userData?.phoneNumber?.trim(),
        roleId: userData?.roleId,
        createdById: userData?.createdById,
        passwordHash: password?.passwordHash,
        pinfl: userData?.pinfl,
        department: userData?.department,
        position: userData?.position,
        photoId: userData?.photoId,
        passport: userData?.passport,
      }))
    } catch (error) {
      if (error?.code === 'P2002') {
        throw new RpcException(
          new BadRequestException({
            message: 'Unique field violation',
          })
        );
      }
      throw new RpcException(
        new BadRequestException({
          message: 'Can not save user',
        })
      );
    }
  }
  async login(userLoginDto: UserLoginDto): Promise<Tokens> {
    const user = await handleAsyncOperation(this.userRepository.findByPhoneNumber(
      userLoginDto.phoneNumber.trim()
    ))

    if (!user)
      throw new RpcException(
        new BadRequestException({
          message: 'Access Denied',
        })
      );

    const passwordMatches = await this.authService.validateUser(
      userLoginDto.password,
      user.passwordHash
    );
    if (!passwordMatches)
      throw new RpcException(
        new BadRequestException({
          message: 'Access Denied',
        })
      );

    const tokens = await this.getTokens(user.id, user.phoneNumber);

    return tokens;
  }
  async createVerification(phoneNumber: string) {
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const expiredAt = new Date(new Date().getTime() + 15 * 60000);

    const verification = await handleAsyncOperation(
      this.userRepository.createVerification(code, phoneNumber, expiredAt)
    );
    await handleAsyncOperation(
      this.generalSmsService.sendSms(
        phoneNumber,
        `IPU universitetiga ro'yxatdan o'tish uchun tasdiqlash kodingiz: ${code}`
      )
    );
    return verification;
  }
  async verifyVerification(id, code) {
    const verificatioon = await handleAsyncOperation(this.userRepository.findOneVerification(id))
    if (!verificatioon) {
      throw new RpcException(
        new BadRequestException({ message: "Noto'gri so'rov!" })
      );
    }
    if (+verificatioon?.code != +code) {
      throw new RpcException(
        new BadRequestException({
          message: "Tasdiq so'zi noto'g'ri kiritildi!",
        })
      );
    }
    const currentDate = new Date();
    if (verificatioon?.expiredAt < currentDate) {
      throw new RpcException(
        new BadRequestException({
          message: "Tasdiq so'zi faqat 15 daqiqa ichida faol!",
        })
      );
    }
    return verificatioon;
  }
  async sendRegistrationVerificationCode(
    createVerification: CreateVerificationDto
  ) {
    let registration = await handleAsyncOperation(
      this.studentConnector.getRegistrationByUserPhoneNumber(
        createVerification?.phoneNumber
      )
    );
    if (!registration) {
      registration = await handleAsyncOperation(
        this.studentConnector.createRegistrationByPhoneNumber(
          createVerification?.phoneNumber
        )
      );
    }
    const verification = await handleAsyncOperation(this.createVerification(
      createVerification?.phoneNumber
    ));
    return { id: verification.id };
  }
  async verifyRegistrationVerificationCode(
    verifyVerificationCode: VerifyVerificationDto
  ) {
    const verification = await this.verifyVerification(
      verifyVerificationCode?.id,
      verifyVerificationCode?.code
    );
    const registration =
      await handleAsyncOperation(this.studentConnector.getRegistrationByUserPhoneNumber(
        verification?.phoneNumber
      ))
    const tokens = await this.getTokens(
      registration.id,
      registration.primary_phone
    );
    await handleAsyncOperation(this.userRepository.deleteVerificationById(verifyVerificationCode.id));
    return { tokens, registration };
  }

  //User related

  async findAll() {
    return await handleAsyncOperation(this.userRepository.findAll())
  }
  async findOne(id: string) {
    return await handleAsyncOperation(this.userRepository.findOne(id));
  }
  async getPersonalInfoExternal( getPersonalInfoExternalDto: GetPersonalInfoExternalDto) {
    return await handleAsyncOperation(
      this.personalInfoService.getPersonalInfo(getPersonalInfoExternalDto)
    );
  }
}
