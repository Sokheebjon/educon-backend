import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class StudentService implements OnModuleInit {
  constructor(
    @Inject('STUDENT_MICROSERVICE') private readonly studentClient: ClientKafka
  ) {}
  async onModuleInit() {
    //registration
     await this.studentClient.subscribeToResponseOf(
      'create_student_registration'
    );
     await this.studentClient.subscribeToResponseOf(
      'update_student_registration'
    );
     await this.studentClient.subscribeToResponseOf('findOne_registration');
     await this.studentClient.subscribeToResponseOf(
      'get_resources_registration'
    );
     await this.studentClient.subscribeToResponseOf(
      'get_resources_registration_excell'
    );
     await this.studentClient.subscribeToResponseOf(
      'update_registration_status'
    );
     await this.studentClient.subscribeToResponseOf('generate-link-for-exam');
     await this.studentClient.subscribeToResponseOf(
      'validate-condidate-for-exam'
    );
     await this.studentClient.subscribeToResponseOf('generate-contact-letter');
     await this.studentClient.subscribeToResponseOf('delete_application');
    //exam
     await this.studentClient.subscribeToResponseOf('get-exam-tests');
     await this.studentClient.subscribeToResponseOf('answer_to_test');

    // after exam 
     await this.studentClient.subscribeToResponseOf('calculate-test-result');
     await this.studentClient.subscribeToResponseOf('generate-contract');

     await this.studentClient.connect();
  }
}
