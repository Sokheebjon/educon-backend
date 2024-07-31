import {
  CreateRegistrationDto,
  GetRegistartionListByFilterDto,
  UpdateRegistrationDto,
  UpdateRegistrationStatusDto,
} from '@edufin-back/shared/dto';
import {
  Prisma,
  StudentPrismaService,
} from '@edufin-back/student-prisma-client';
import { BadRequestException, Injectable } from '@nestjs/common';
import { CatalogConnectorService } from '../../../connector-services/catalog-connector.service';
import { handleAsyncOperation } from '@edufin-back/common';
import { RpcException } from '@nestjs/microservices';
import { RegistrationEntity } from 'libs/shared/src/entities/registration.entity';
import { FileConnectorService } from 'apps/student-microservice/src/connector-services/file-connector.service';

@Injectable()
export class RegistrationRepository {
  constructor(
    private readonly catalogConnectorService: CatalogConnectorService,
    private readonly studentPrismaService: StudentPrismaService,
    private readonly fileConnectorService: FileConnectorService
  ) {}

  async findUniqueNotParsed(id: string) {
    const registration: RegistrationEntity = await handleAsyncOperation(
      this.studentPrismaService.application.findUnique({ where: { id } })
    );
    if (!registration) {
      throw new RpcException(
        new BadRequestException({
          message: 'Not found any application with this id',
        })
      );
    }
    return registration;
  }
  async deleteOnebyId(id: string) {
    return await handleAsyncOperation(
      this.studentPrismaService.application.delete({ where: { id } })
    );
  }
  async isApplicationNumberExist(application_number: number) {
    return await handleAsyncOperation(
      this.studentPrismaService.application.findUnique({
        where: {
          application_number,
        },
      })
    );
  }
  async isApplicationExist(primaryPhoneOrId: string) {
    return await handleAsyncOperation(
      this.studentPrismaService.application.findUnique({
        where: {
          primary_phone: primaryPhoneOrId,
        },
      })
    );
  }

  async create(
    createRegistrationDto: CreateRegistrationDto,
    application_number: number
  ) {
    return await handleAsyncOperation(
      this.studentPrismaService.application.create({
        data: { ...createRegistrationDto, application_number },
      })
    );
  }
  async update(id: string, updateRegistrationDto: UpdateRegistrationDto) {
    if (updateRegistrationDto?.passport) {
      const isUserExistByThisPassport =
        await this.studentPrismaService.application.findUnique({
          where: {
            passport: updateRegistrationDto.passport,
          },
        });
      if (isUserExistByThisPassport && isUserExistByThisPassport.id !== id) {
        throw new RpcException(
          new BadRequestException({
            message: "Bunday passport ma'lumoti ro'yxatdan o'tkazilgan",
          })
        );
      }
    }

    return await handleAsyncOperation(
      this.studentPrismaService.application.update({
        where: { id },
        data: updateRegistrationDto,
      })
    );
  }

  async findOne(id: string) {
    const registration: RegistrationEntity = await handleAsyncOperation(
      this.findUniqueNotParsed(id)
    );
    if (registration.registration_purpose_id) {
      const registrationPurpose = await handleAsyncOperation(
        this.catalogConnectorService.getSingleRegistrationPurpose(
          registration.registration_purpose_id
        )
      );
      registration.registration_purpose = registrationPurpose;
    }
    if (registration?.education_direction_id) {
      const educationDirection = await handleAsyncOperation(
        this.catalogConnectorService.getSingleEducationDirection(
          registration.education_direction_id,
          registration?.education_form_id
        )
      );
      registration.education_direction = educationDirection;
    }
    if (registration?.education_form_id) {
      const educationForm = await handleAsyncOperation(
        this.catalogConnectorService.getSingleEducationForm(
          registration.education_form_id
        )
      );
      registration.education_form = educationForm;
    }
    if (registration?.studied_education_form_id) {
      const studiedEducationForm = await handleAsyncOperation(
        this.catalogConnectorService.getSingleEducationForm(
          registration.studied_education_form_id
        )
      );
      registration.studied_education_form = studiedEducationForm;
    }
    if (registration?.education_language_id) {
      const educationLanguage = await handleAsyncOperation(
        this.catalogConnectorService.getSingleEducationLanguage(
          registration.education_language_id
        )
      );
      registration.education_language = educationLanguage;
    }

    if (registration?.dtm_file_id) {
      const file = await handleAsyncOperation(
        this.fileConnectorService.getSingleFile(registration.dtm_file_id)
      );
      registration.dtm_file = file;
    }

    if (registration?.ielts_file_id) {
      const file = await handleAsyncOperation(
        this.fileConnectorService.getSingleFile(registration.ielts_file_id)
      );
      registration.ielts_file = file;
    }

    if (registration?.diplom_file_id) {
      const file = await handleAsyncOperation(
        this.fileConnectorService.getSingleFile(registration.diplom_file_id)
      );
      registration.diplom_file = file;
    }

    if (registration?.passport_file_id) {
      const file = await handleAsyncOperation(
        this.fileConnectorService.getSingleFile(registration.passport_file_id)
      );
      registration.passport_file = file;
    }

    return registration;
  }
  async findOneByPhoneNumber(phoneNumber: string) {
    const registration = await handleAsyncOperation(
      this.studentPrismaService.application.findFirst({
        where: { primary_phone: phoneNumber },
      })
    );
    return registration;
  }
  async getResources(getResources: GetRegistartionListByFilterDto) {
    const {
      take,
      page,
      primary_phone,
      registration_purpose_id,
      secondary_phone,
      starting_course,
      status,
      studied_country,
      studied_education_direction,
      studied_university,
      search,
      education_direction_id,
      education_form_id,
      education_language_id,
      finished_course,
      gender_id,
      passport,
      is_contract_generated,
      sort,
    } = getResources;
    const whereArgs: Prisma.ApplicationWhereInput = {};
    const orConditions: Prisma.ApplicationWhereInput[] = [];

    const addSearchCondition = (field, value) => {
      if (value) {
        orConditions.push({
          [field]: {
            startsWith: value,
            mode: 'insensitive',
          },
        });
      }
    };

    [
      'first_name',
      'last_name',
      'father_name',
      'primary_phone',
      'passport',
    ].forEach((field) => {
      if (search) {
        addSearchCondition(field, search);
      }
    });

    const filters = {
      registration_purpose_id,
      education_language_id,
      gender_id,
      education_direction_id,
      education_form_id,
      status,
      is_contract_generated,
    };
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        if (key === 'is_contract_generated') {
          whereArgs[key] = value === 'true';
        } else {
          whereArgs[key] = value;
        }
      }
    });

    const dynamicFilters = {
      primary_phone,
      secondary_phone,
      finished_course,
      starting_course,
      studied_university,
      studied_education_direction,
      studied_country,
      passport,
    };
    Object.entries(dynamicFilters).forEach(([key, value]) =>
      addSearchCondition(key, value)
    );

    if (orConditions?.length) {
      whereArgs.OR = orConditions;
    }
    const skip = +take * +page;
    const dataCount = await handleAsyncOperation(
      this.studentPrismaService.application.count({
        where: whereArgs,
      })
    );
    const orderBy:any =
      sort === 'contract_generated_date'
        ? {
            contract_generated_date: 'desc',
          }
        : {
            createdAt: 'desc',
          };
    const data: RegistrationEntity[] = await handleAsyncOperation(
      this.studentPrismaService.application.findMany({
        skip,
        take: +take,
        where: whereArgs,
        orderBy,
      })
    );
    const allRegistrationPurposes = await handleAsyncOperation(
      this.catalogConnectorService.getAllRegistrationPurpose()
    );
    const allEducationForm = await handleAsyncOperation(
      this.catalogConnectorService.getAllEducationForm()
    );
    const allEducationDirection = await handleAsyncOperation(
      this.catalogConnectorService.getAllEducationDirection()
    );
    const allEducationLanguage = await handleAsyncOperation(
      this.catalogConnectorService.getAllEducationLanguage()
    );
    data?.forEach(async (item: RegistrationEntity) => {
      if (item?.registration_purpose_id) {
        item.registration_purpose = allRegistrationPurposes.find(
          (el) => el.id === item.registration_purpose_id
        );
      }
      if (item?.education_form_id) {
        item.education_form = allEducationForm.find(
          (el) => el.id === item.education_form_id
        );
      }
      if (item?.education_direction_id) {
        item.education_direction = allEducationDirection.find(
          (el) => el.id === item.education_direction_id
        );
      }
      if (item?.education_language_id) {
        item.education_language = allEducationLanguage.find(
          (el) => el.id === item.education_language_id
        );
      }
      return item;
    });
    return {
      data,
      meta: {
        total: dataCount,
        page,
      },
    };
  }
  async updateApplicationStatusMutation(
    updateRegistrationStatusDto: UpdateRegistrationStatusDto
  ) {
    return await handleAsyncOperation(
      this.studentPrismaService.application.update({
        where: {
          id: updateRegistrationStatusDto?.id,
        },
        data: {
          status: updateRegistrationStatusDto?.status,
        },
      })
    );
  }
}
