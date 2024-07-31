import { BadRequestException, Injectable } from '@nestjs/common';
import { RegistrationRepository } from '../repository/registration.repository';
import {
  CreateRegistrationDto,
  GetRegistartionExcellListByFilterDto,
  GetRegistartionListByFilterDto,
  UpdateRegistrationDto,
  UpdateRegistrationStatusDto,
} from '@edufin-back/shared/dto';
import { RpcException } from '@nestjs/microservices';
import { ApplicationStatus } from '@edufin-back/student-prisma-client';
import { ConfigService } from '@nestjs/config';
import { GeneralSmsService } from '@edufin-back/common/services';
import { handleAsyncOperation } from '@edufin-back/common';
import { AuthConnectorService } from '../../../connector-services/auth-connector.service';
import { CrmIntegrationService } from './crm-integration.service';
import { CatalogConnectorService } from '../../../connector-services/catalog-connector.service';
import { TestConnectorService } from '../../../connector-services/test-connector.service';
import moment from 'moment';
import * as ExcelJS from 'exceljs';

@Injectable()
export class RegistrationService {
  constructor(
    private readonly configService: ConfigService,
    private readonly generalSmsService: GeneralSmsService,
    private readonly registrationRepository: RegistrationRepository,
    private readonly authConnectorService: AuthConnectorService,
    private readonly crmIntegrationService: CrmIntegrationService,
    private readonly catalogConnectorService: CatalogConnectorService,
    private readonly testConnectorService: TestConnectorService
  ) {}
  async generateYearPrefixedRandomNumber() {
    const year = new Date().getFullYear();
    const yearStr = year.toString();
    let result = yearStr;
    for (let i = 0; i < 5; i++) {
      const randomDigit = Math.floor(Math.random() * 10); // Generate a random digit between 0 and 9
      result += randomDigit.toString();
    }
    return parseInt(result, 10);
  }
  async generateApplicationNumber() {
    const generatedNumber = await this.generateYearPrefixedRandomNumber();
    const isApplicationNumberExist =
      await this.registrationRepository.isApplicationNumberExist(
        generatedNumber
      );
    if (isApplicationNumberExist) {
      return await this.generateApplicationNumber();
    } else {
      return generatedNumber;
    }
  }

  async create(createRegistrationDto: CreateRegistrationDto) {
    const primary_phone = createRegistrationDto?.primary_phone?.trim();

    const isUserRegisteredBefore = await handleAsyncOperation(
      this.registrationRepository.isApplicationExist(primary_phone)
    );
    if (isUserRegisteredBefore) {
      throw new RpcException(
        new BadRequestException({
          message: "Ushbu telefon raqam avval ro'yxatdan o'tkazilgan",
        })
      );
    }
    const generateApplicationNumber = await this.generateApplicationNumber();
    const registration = await handleAsyncOperation(
      this.registrationRepository.create(
        {
          primary_phone,
        },
        generateApplicationNumber
      )
    );
    const crmResult = await handleAsyncOperation(
      this.crmIntegrationService.createRegistrationToCrm(registration)
    );
    if (crmResult) {
      return await handleAsyncOperation(
        this.registrationRepository.update(registration?.id, {
          crm_id: crmResult,
        })
      );
    }
    return registration;
  }
  async update(id: string, updateRegistrationDto: UpdateRegistrationDto) {
    await delete updateRegistrationDto.application_number;
    const registration = await handleAsyncOperation(
      this.registrationRepository.update(id, updateRegistrationDto)
    );
    await handleAsyncOperation(
      this.crmIntegrationService.updateRegistrationToCrm(registration?.id)
    );
    return registration;
  }
  async findOne(id: string) {
    return await this.registrationRepository.findOne(id);
  }
  async findOneNotPopulated(id: string) {
    return await this.registrationRepository.findUniqueNotParsed(id);
  }

  async findOneByPhoneNumber(phoneNumber: string) {
    return await this.registrationRepository.findOneByPhoneNumber(phoneNumber);
  }

  async getResources(getResources: GetRegistartionListByFilterDto) {
    return await this.registrationRepository.getResources(getResources);
  }
  async getResourcesToExcell(
    getResources: GetRegistartionExcellListByFilterDto
  ) {
    const registration = await this.registrationRepository.getResources({
      page: '0',
      take: '100000000',
      ...getResources,
    });
    const rows = registration?.data?.map((o, i) => {
      return [
        i + 1,
        o?.contract_number || '',
        o?.contract_generated_date || '',
        `${o?.last_name} ${o?.first_name} ${o?.father_name}`,
        o?.passport || '',
        o?.pinfl || '',
        o?.gender_id === 1 ? 'Erkak' : 'Ayol',
        o?.birth_date || '',
        o?.primary_phone,
        o?.secondary_phone || '',
        o?.education_direction?.nameUz || '',
        o?.education_form?.nameUz || '',
        o?.registration_purpose?.nameUz || '',
        o?.education_language?.nameUz || '',
        o?.createdAt || '',
        o?.status || '',
        o?.contract_summa || '',
        o?.course || '',
        o?.studied_university || '',
        o?.studied_education_direction || '',
      ];
    });
    try {
      const workbook = new ExcelJS.Workbook();
      const sheet = workbook.addWorksheet('Application report');
      sheet.getColumn('A').width = 15;
      sheet.getColumn('B').width = 30;
      sheet.getColumn('C').width = 30;
      sheet.getColumn('D').width = 35;
      sheet.getColumn('E').width = 25;
      sheet.getColumn('F').width = 30;
      sheet.getColumn('G').width = 30;
      sheet.getColumn('H').width = 25;
      sheet.getColumn('K').width = 25;
      sheet.getColumn('L').width = 35;
      sheet.getColumn('M').width = 25;
      sheet.getColumn('K').width = 25;
      sheet.getColumn('M').width = 30;
      sheet.getColumn('N').width = 30;
      sheet.getColumn('O').width = 25;
      sheet.getColumn('P').width = 30;
      sheet.getColumn('Q').width = 30;
      sheet.getColumn('R').width = 30;
      sheet.getColumn('S').width = 30;
      sheet.getColumn('T').width = 30;
      sheet.addTable({
        name: 'table1',
        ref: 'A1',
        headerRow: true,
        style: {
          theme: 'TableStyleLight1',
          showRowStripes: true,
        },
        columns: [
          { name: 'T/R' },
          { name: 'Shartnoma raqami' },
          { name: 'Shartnoma sanasi' },
          { name: 'F.I.O' },
          { name: 'Passport seriya va raqami' },
          { name: 'PINFL' },
          { name: 'Jinsi' },
          { name: "Tug'ilgan sanasi" },
          { name: 'Telefon raqam (1)' },
          { name: 'Telefon raqam (2)' },
          { name: "Ta'lim yo'nalishi" },
          { name: "Ta'lim  shakli" },
          { name: "Ta'lim  turi" },
          { name: "Ta'lim  tili" },
          { name: 'Ariza sanasi' },
          { name: 'Status' },
          { name: 'Shartnoma summasi' },
          { name: 'Kurs' },
          { name: 'Tahsil olgan universitet' },
          { name: 'Tahsil olgan yo\'nalish' },
        ],
        rows: [...rows],
      });

      const buffer = await workbook.xlsx.writeBuffer();
      const base64String = Buffer.from(buffer).toString('base64');
      return base64String;
    } catch (err) {
      console.log(err);
    }
  }
  async updateApplicationStatus(
    updateRegistrationStatusDto: UpdateRegistrationStatusDto
  ) {
    const registration = await this.registrationRepository.findUniqueNotParsed(
      updateRegistrationStatusDto?.id
    );
    if (!registration) {
      throw new RpcException(
        new BadRequestException({
          message: "Ushbu id bilan ma'lumot topilmadi",
        })
      );
    }
    if (
      updateRegistrationStatusDto?.status ===
        ApplicationStatus.EXAM_CANCELLED ||
      updateRegistrationStatusDto?.status === ApplicationStatus.IN_PROCESS
    ) {
      throw new RpcException(
        new BadRequestException({
          message: 'Ushbu statusni berishga sizda ruxsat yuq!',
        })
      );
    }
    const updated_version =
      await this.registrationRepository.updateApplicationStatusMutation(
        updateRegistrationStatusDto
      );
    if (updateRegistrationStatusDto.status === 'EXAM_FINISHED') {
      // await this.registrationRepository.update(updateRegistrationStatusDto.id, {
      //   contract_generated_date: new Date(),
      // });
      const success_message = `Tabriklaymiz siz "IQTISODIYOT VA PEDAGOGIKA UNIVERSITETI"ga talabalikka tavsiya etildingiz. Shartnomani quyidagi havola orqali yuklab olishingiz mumkin. https://ipu.educon.uz/registration/step3`;
      await handleAsyncOperation(
        this.generalSmsService.sendSms(
          registration?.primary_phone,
          success_message
        )
      );
    }
    if (updateRegistrationStatusDto.status === 'REJECTED') {
      await this.registrationRepository.update(
        updateRegistrationStatusDto?.id,
        {
          comment: updateRegistrationStatusDto?.comment,
        }
      );
      await handleAsyncOperation(
        this.generalSmsService.sendSms(
          registration?.primary_phone,
          updateRegistrationStatusDto?.comment
        )
      );
    }
    await this.crmIntegrationService.updateRegistrationToCrm(registration?.id);
    return updated_version;
  }
  async generateExamLink(id: string) {
    const registration = await this.registrationRepository.findUniqueNotParsed(
      id
    );
    if (!registration) {
      throw new RpcException(
        new BadRequestException({
          message: "Ushbu id bilan ma'lumot topilmadi",
        })
      );
    }
    //exam formid 0 is ONLINE
    if (registration?.exam_form_id != 0) {
      throw new RpcException(
        new BadRequestException({
          message: 'Ushbu abituriyent online  imtihon usulini tanlamagan!',
        })
      );
    }
    const client_domain = this.configService.get<string>(
      'app.client_host_regidtration'
    );
    const university = this.configService.get<string>('app.university_name');
    const link = `${client_domain}/exams/${registration.id}`;
    const sms_content = `Sizning  ${university}ga yuborgan arizangiz qabul qilindi. Kirish testini quyidagi havola orqali topshirishingiz mumkin  ${link}`;
    await handleAsyncOperation(
      this.generalSmsService.sendSms(registration?.primary_phone, sms_content)
    );
    return { success: true };
  }

  async calculateTestResult(id: string, isDetailed: boolean) {
    const registration = await this.registrationRepository.findUniqueNotParsed(
      id
    );
    if (!registration) {
      throw new RpcException(
        new BadRequestException({
          message: "Ushbu id bilan ma'lumot topilmadi",
        })
      );
    }
    const educationDirection = await handleAsyncOperation(
      this.catalogConnectorService.getSingleEducationDirection(
        registration.education_direction_id
      )
    );
    const academic_blogs = educationDirection?.academic_blocks;
    const testResults = await handleAsyncOperation(
      this.testConnectorService.getTestResults(registration.id)
    );
    let detailedTestResults = undefined;
    if (isDetailed) {
      detailedTestResults = await handleAsyncOperation(
        this.testConnectorService.getDetailedTestResults(registration.id)
      );
    }

    const total_scores_by_subject = [];
    testResults.data?.forEach((item) => {
      const academicBlock = academic_blogs?.find(
        (ab) => ab?.subject_id === item?.subject_id
      );
      total_scores_by_subject.push({
        subject: academicBlock.subject,
        score: academicBlock?.score * item?.correct_answers,
      });
    });
    const total_score = total_scores_by_subject.reduce((acc, curr) => {
      return acc + curr?.score;
    }, 0);
    await handleAsyncOperation(
      this.registrationRepository.update(registration?.id, { total_score })
    );
    return { total_scores_by_subject, total_score, detailedTestResults };
  }

  async generateContract(id, score, isDownload) {
    const registration = await this.registrationRepository.findOne(id);
    if (!registration) {
      throw new RpcException(
        new BadRequestException({
          message: "Ushbu id bilan ma'lumot topilmadi",
        })
      );
    }

    const agreementLimit = await handleAsyncOperation(
      this.catalogConnectorService.getAgreementLimit({
        education_direction_id: registration?.education_direction_id,
        score: score ? +score : registration?.total_score,
        education_form_id: registration?.education_form_id,
      })
    );
    const current_year_last_digits = moment().format('YY');

    const contract_number = `${
      registration?.education_direction?.short_title
    }-${
      registration?.education_direction?.code?.toString()[0]
    }${current_year_last_digits}${registration?.application_number}/${
      registration?.starting_course ? registration?.starting_course : 1
    }${registration?.education_form?.nameUz?.[0]}`;

    if (score && !registration?.total_score && !isDownload) {
      await handleAsyncOperation(
        this.registrationRepository.update(registration?.id, {
          total_score: +score,
        })
      );
    }
    if (isDownload!='true'){
      console.log(isDownload,typeof isDownload,22)
      await handleAsyncOperation(
        this.registrationRepository.update(registration?.id, {
          contract_generated_date: new Date(),
          contract_number,
          contract_summa: agreementLimit?.price,
          course: String(
            registration?.starting_course ? registration?.starting_course : 1
          ),
          is_contract_generated: true,
        })
      )
    }
     

    const payload = {
      contract_number,
      contract_date: moment(
        registration?.contract_generated_date || new Date()
      ).format('DD.MM.YYYY'),
      academic_degree:
        registration?.education_direction?.academic_degree?.nameUz,
      course: registration?.starting_course ? registration?.starting_course : 1,
      student_full_name: `${registration?.last_name} ${registration?.first_name} ${registration?.father_name}`,
      education_form: registration?.education_form?.nameUz || '',
      duration: registration?.education_direction?.duration,
      education_direction: registration?.education_direction?.nameUz,
      contract_summa: agreementLimit?.price,
      contract_summa_text: agreementLimit?.price_in_text,
      primary_phone: registration?.primary_phone,
    };
    this.crmIntegrationService.updateRegistrationToCrmcontractPipeline(
      registration?.id
    );
    return payload;
  }
  async generateContactLetter(id) {
    const registration = await this.registrationRepository.findOne(id);
    if (!registration) {
      throw new RpcException(
        new BadRequestException({
          message: "Ushbu id bilan ma'lumot topilmadi",
        })
      );
    }

    const payload = {
      contact_date: registration?.contract_generated_date,
      contract_number: registration?.contract_number,
      study_direction: registration?.studied_education_direction_cyrl,
      student_full_name_cyrl: `${registration?.surname_cyrl} ${registration?.name_cyrl} ${registration?.middlename_cyrl}`,
      studied_university_cyrl: registration?.studied_university_cyrl,
    };
    return payload;
  }

  async validateCondidateForExam(id: string) {
    const registration = await this.registrationRepository.findUniqueNotParsed(
      id
    );

    if (!registration) {
      throw new RpcException(
        new BadRequestException({
          message: "Ushbu id bilan ma'lumot topilmadi",
        })
      );
    }
    //exam formid 0 is ONLINE
    if (registration?.exam_form_id != 0) {
      throw new RpcException(
        new BadRequestException({
          message: 'Ushbu abituriyent online  imtihon usulini tanlamagan!',
        })
      );
    }

    const validation = await handleAsyncOperation(
      this.authConnectorService.sendVerificationCode({
        phoneNumber: registration?.primary_phone,
      })
    );
    return { id: validation?.id };
  }
  async delete(id: string) {
    const registration = await this.registrationRepository.findUniqueNotParsed(
      id
    );

    if (!registration) {
      throw new RpcException(
        new BadRequestException({
          message: "Ushbu id bilan ma'lumot topilmadi",
        })
      );
    }
    await handleAsyncOperation(
      this.testConnectorService.deleteUserDataByRegistrationId(registration?.id)
    );
    return await handleAsyncOperation(
      this.registrationRepository.deleteOnebyId(registration?.id)
    );
  }
}
