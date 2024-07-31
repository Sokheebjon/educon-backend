import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';

import {  ApiQuery, ApiTags } from '@nestjs/swagger';
import { RegistrationService } from './registration.service';
import {
  CreateRegistrationDto,
  GetContractPayloadDto,
  GetRegistartionExcellListByFilterDto,
  GetRegistartionListByFilterDto,
  UpdateRegistrationDto,
  UpdateRegistrationStatusDto,
} from '@edufin-back/shared/dto';
import { Public } from '@edufin-back/common/decorators';

@ApiTags('Regsitration')
@Controller('registration')
export class RegistrationController {
  constructor(private readonly registrationService: RegistrationService) {}
  @Post()
  create(@Body() createRegistrationDto: CreateRegistrationDto) {
    return this.registrationService.create(createRegistrationDto);
  }
  @Patch('update-application-status')
  updateApplicationStatus(
    @Body() updateRegistrationStatusDto: UpdateRegistrationStatusDto
  ) {
    return this.registrationService.updateApplicationStatus(
      updateRegistrationStatusDto
    );
  }
  @Get('generate-exam-link/:id')
  generateExamLink(@Param('id') id: string) {
    return this.registrationService.generateExamLink(id);
  }
  @Public()
  @Get('verify-condidate-for-exam/:id')
  validateCondidateForExam(@Param('id') id: string) {
    return this.registrationService.validateCondidateForExam(id);
  }

  @Get('verify-condidate-for-exam/:id')
  verifyCondidateForExam(@Param('id') id: string) {
    return this.registrationService.validateCondidateForExam(id);
  }
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateRegistrationDto: UpdateRegistrationDto
  ) {
    return this.registrationService.update(id, updateRegistrationDto);
  }
  @Delete(':id')
  delete(
    @Param('id') id: string,
  ) {
    return this.registrationService.delete(id);
  }
  @Get()
  getResources(@Query() getResources: GetRegistartionListByFilterDto) {
    return this.registrationService.getResources(getResources);
  }
  @Get('excell')
  async getResourcesToExcell(
    @Query() getResources: GetRegistartionExcellListByFilterDto
  ) {
    return await this.registrationService.getResourcesToExcell(getResources);
  }
  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.registrationService.findOne(id);
  }
  @Get('generate-contact-letter/:id')
  generateContactLetter(
    @Param('id') registration_id: string,
  ) {
    return this.registrationService.generateContactLetter(
      registration_id,
    );
  }
  @Get('generate-contract/:id')
  generateContract(
    @Param('id') registration_id: string,
    @Query() query: GetContractPayloadDto
  ) {
    return this.registrationService.generateContract(
      registration_id,
      query?.score,
      query?.isDownload
    );
  }
  @Get('calculate-test-result/:id')
  @ApiQuery({
    name: 'isDetailed',
    required: false,
    type: Boolean,
    description: 'Specify if detailed result is required',
  })
  calculateTestResult(
    @Param('id') registration_id: string,
    @Query('isDetailed') isDetailed?: boolean
  ) {
    return this.registrationService.calculateTestResult(
      registration_id,
      isDetailed
    );
  }
}
