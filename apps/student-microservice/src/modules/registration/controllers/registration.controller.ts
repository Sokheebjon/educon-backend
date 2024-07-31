import { Controller, Inject, OnModuleInit } from '@nestjs/common';
import { ClientKafka, MessagePattern, Payload } from '@nestjs/microservices';
import { RegistrationService } from '../services/registration.service';
import {
  GetRegistartionExcellListByFilterDto,
  GetRegistartionListByFilterDto,
  UpdateRegistrationDto,
  UpdateRegistrationStatusDto,
} from '@edufin-back/shared/dto';
import { handleAsyncOperation } from '@edufin-back/common';

@Controller()
export class RegistrationController implements OnModuleInit {
  constructor(
    @Inject('CATALOG_MICROSERVICE') private readonly catalogClient: ClientKafka,
    @Inject('FILE_MICROSERVICE') private readonly fileClient: ClientKafka,
    @Inject('AUTH_MICROSERVICE') private readonly authClient: ClientKafka,
    @Inject('TEST_MICROSERVICE') private readonly testClient: ClientKafka,
    private readonly registrationService: RegistrationService
  ) {}

  async onModuleInit() {
    this.catalogClient.subscribeToResponseOf(
      'findOne_catalog_registration_purpose'
    );
    this.catalogClient.subscribeToResponseOf(
      'get_catalog_registration_purpose'
    );
    this.catalogClient.subscribeToResponseOf(
      'findOne_catalog_education_direction'
    );
    this.catalogClient.subscribeToResponseOf('get_catalog_education_direction');
    this.catalogClient.subscribeToResponseOf('get_one_by_score_match');
    this.catalogClient.subscribeToResponseOf('findOne_catalog_education_form');
    this.catalogClient.subscribeToResponseOf('get_catalog_education_form');
    this.catalogClient.subscribeToResponseOf(
      'findOne_catalog_education_language'
    );
    this.catalogClient.subscribeToResponseOf('get_catalog_education_language');
    this.fileClient.subscribeToResponseOf('findOne_file-info');
    this.fileClient.subscribeToResponseOf('findOne_by_phoneNumber');
    this.authClient.subscribeToResponseOf('send_verification_code');
    this.authClient.subscribeToResponseOf('verify_verification_code');

    //test microservice
    this.testClient.subscribeToResponseOf(
      'get_test_results_by_registration_id'
    );
    this.testClient.subscribeToResponseOf(
      'get_detailed_test_results_by_registration_id'
    );

    await this.catalogClient.connect();
    await this.authClient.connect();
    await this.fileClient.connect();
    await this.testClient.connect();
  }

  @MessagePattern('create_student_registration')
  async create(@Payload() payload) {
    return await handleAsyncOperation(this.registrationService.create(payload));
  }
  @MessagePattern('update_student_registration')
  async update(
    @Payload()
    payload: {
      id: string;
      updateRegistrationDto: UpdateRegistrationDto;
    }
  ) {
    return await this.registrationService.update(
      payload?.id,
      payload.updateRegistrationDto
    );
  }
  @MessagePattern('findOne_registration')
  async findOne(@Payload() payload: { id: string }) {
    return await this.registrationService.findOne(payload?.id);
  }
  @MessagePattern('findOne_registration_not_populated')
  async findOneNotPopulated(@Payload() payload: { id: string }) {
    return await this.registrationService.findOneNotPopulated(payload?.id);
  }
  @MessagePattern('generate-link-for-exam')
  async generateExamLink(@Payload() payload: { id: string }) {
    return await this.registrationService.generateExamLink(payload?.id);
  }
  @MessagePattern('generate-contract')
  async generateContract(@Payload() payload: { id: string , score, isDownload}) {
    return await this.registrationService.generateContract(payload?.id,payload?.score, payload?.isDownload) ;
  }
  @MessagePattern('generate-contact-letter')
  async generateContactLetter(@Payload() payload: { id: string }) {
    return await this.registrationService.generateContactLetter(payload?.id) ;
  }
  @MessagePattern('calculate-test-result')
  async calculateTestResult(@Payload() payload: { id: string, isDetailed:boolean }) {
    return await this.registrationService.calculateTestResult(payload?.id, Boolean(payload?.isDetailed));
  }
  @MessagePattern('validate-condidate-for-exam')
  async validateCondidateForExam(@Payload() payload: { id: string }) {
    return await this.registrationService.validateCondidateForExam(payload?.id);
  }
  @MessagePattern('delete_application')
  async delete(@Payload() payload: { id: string }) {
    return await this.registrationService.delete(payload?.id);
  }

  @MessagePattern('find_registartion_by_phone_number')
  async findOneByPhoneNumber(@Payload() payload: { phoneNumber: string }) {
    return await this.registrationService.findOneByPhoneNumber(
      payload?.phoneNumber
    );
  }
  @MessagePattern('get_resources_registration')
  async getResources(
    @Payload() payload: { getResources: GetRegistartionListByFilterDto }
  ) {
    return await this.registrationService.getResources(payload.getResources);
  }
  @MessagePattern('get_resources_registration_excell')
  async getResourcesToExcell(
    @Payload() payload: { getResources: GetRegistartionExcellListByFilterDto }
  ) {
    return await this.registrationService.getResourcesToExcell(payload.getResources);
  }
  @MessagePattern('update_registration_status')
  async updateApplicationStatus(
    @Payload()
    payload: {
      updateRegistrationStatusDto: UpdateRegistrationStatusDto;
    }
  ) {
    return await this.registrationService.updateApplicationStatus(
      payload.updateRegistrationStatusDto
    );
  }
}
