import {
  GetTestsByRegistration,
  UpdateAnswerToTestDto,
} from '@edufin-back/shared/dto';
import { ICalculatedTestResult } from '@edufin-back/shared/interfaces';
import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class TestConnectorService {
  constructor(
    @Inject('TEST_MICROSERVICE') private readonly testClient: ClientKafka
  ) {}
  async getTestsBySubjectId(payload: GetTestsByRegistration) {
    const tests = await this.testClient.send(
      'get_tests_by_registration_id',
      payload
    );
    return await firstValueFrom(tests);
  }
  async writeAnswers(payload: UpdateAnswerToTestDto) {
    const tests = await this.testClient.send(
      'update_test_answer_by_registration_id',
      payload
    );
    return await firstValueFrom(tests);
  }
  async getTestResults(registration_id):Promise<ICalculatedTestResult> {
    const tests = await this.testClient.send(
      'get_test_results_by_registration_id',
      { registration_id }
    );
    return await firstValueFrom(tests);
  }
  async getDetailedTestResults(registration_id):Promise<ICalculatedTestResult> {
    const tests = await this.testClient.send(
      'get_detailed_test_results_by_registration_id',
      { registration_id }
    );
    return await firstValueFrom(tests);
  }
  async deleteUserDataByRegistrationId(registration_id:string){
     await this.testClient.emit(
      'delete_user_test_data_by_registration_id',
      { registration_id }
    );
  }
}
