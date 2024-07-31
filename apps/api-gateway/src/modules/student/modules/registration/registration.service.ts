import {
  CreateRegistrationDto,
  GetRegistartionExcellListByFilterDto,
  GetRegistartionListByFilterDto,
  UpdateRegistrationDto,
  UpdateRegistrationStatusDto,
} from '@edufin-back/shared/dto';
import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class RegistrationService {
  constructor(
    @Inject('STUDENT_MICROSERVICE') private readonly studentClient: ClientKafka
  ) {}
  async create(createRegistrationDto: CreateRegistrationDto) {
    return await this.studentClient.send(
      'create_student_registration',
      createRegistrationDto
    );
  }
  async update(id, updateRegistrationDto: UpdateRegistrationDto) {
    return await this.studentClient.send('update_student_registration', {
      id,
      updateRegistrationDto,
    });
  }
  async findOne(id: string) {
    return await this.studentClient.send('findOne_registration', { id });
  }
  async delete(id: string) {
    return await this.studentClient.send('delete_application', { id });
  }
  async generateExamLink(id: string) {
    return await this.studentClient.send('generate-link-for-exam', { id });
  }

  async validateCondidateForExam(id: string) {
    return await this.studentClient.send('validate-condidate-for-exam', { id });
  }
  async getResources(getResources: GetRegistartionListByFilterDto) {
    return await this.studentClient.send('get_resources_registration', {
      getResources,
    });
  }
  async getResourcesToExcell(
    getResources: GetRegistartionExcellListByFilterDto
  ) {
    return await this.studentClient.send('get_resources_registration_excell', {
      getResources,
    });
  }
  async updateApplicationStatus(
    updateRegistrationStatusDto: UpdateRegistrationStatusDto
  ) {
    return await this.studentClient.send('update_registration_status', {
      updateRegistrationStatusDto,
    });
  }
  async generateContract(id: string, score,isDownload) {
    return await this.studentClient.send('generate-contract', {
      id,
      score,
      isDownload
    });
  }
  async generateContactLetter(id: string) {
    return await this.studentClient.send('generate-contact-letter', {
      id,
    });
  }
  async calculateTestResult(id: string, isDetailed: boolean) {
    return await this.studentClient.send('calculate-test-result', {
      id,
      isDetailed,
    });
  }
}
