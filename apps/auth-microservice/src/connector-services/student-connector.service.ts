import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { RegistrationEntity } from 'libs/shared/src/entities/registration.entity';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class StudentConnectorService {
  constructor(
    @Inject('STUDENT_MICROSERVICE') private readonly studentClient: ClientKafka
  ) {}
  async getRegistrationByUserPhoneNumber(
    phoneNumber: string
  ): Promise<RegistrationEntity> {
    const registration = await this.studentClient.send(
      'find_registartion_by_phone_number',
      { phoneNumber }
    );

    return await firstValueFrom(registration);
  }
  async   createRegistrationByPhoneNumber(
    phoneNumber: string
  ): Promise<RegistrationEntity> {
    const registration = await this.studentClient.send(
      'create_student_registration',
      { primary_phone: phoneNumber }
    );
    return await firstValueFrom(registration);
  }
}
