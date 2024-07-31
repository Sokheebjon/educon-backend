import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class StudentConnectorService {
  constructor(
    @Inject('STUDENT_MICROSERVICE') private readonly studentClient: ClientKafka
  ) {}

  async getOne(id:string) {
    const response$ = this.studentClient.send(
      'findOne_registration_not_populated',
      { id }
    );

    const response = await firstValueFrom(response$);
    return response;
  }
}
