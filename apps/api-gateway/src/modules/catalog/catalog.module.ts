import { Module } from '@nestjs/common';
import { EducationFormModule } from './modules/education-form/education-form.module';
import { EducationFormService } from './modules/education-form/education-form.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { EducationLanguageService } from './modules/education-language/education-language.service';
import { EducationLanguageModule } from './modules/education-language/education-language.module';
import { CatalogService } from './catalog.service';
import { AcademicDegreeModule } from './modules/academic-degree/academic-degree.module';
import { AcademicDegreeService } from './modules/academic-degree/academic-degree.service';
import { AcademicSubjectModule } from './modules/academic-subjects/academic-subject.module';
import { AcademicSubjectService } from './modules/academic-subjects/academic-subject.service';
import { EducationDirectionModule } from './modules/education-direction/education-direction.module';
import { EducationDirectionService } from './modules/education-direction/education-direction.service';
import { DepartmentModule } from './modules/department/department.module';
import { DepartmentService } from './modules/department/department.service';
import { PositionModule } from './modules/position/position.module';
import { PositionService } from './modules/position/position.service';
import { AgreementPriceModule } from './modules/agreement-price/agreement-price.module';
import { AgreementPriceService } from './modules/agreement-price/agreement-price.service';
import { RoomModule } from './modules/rooms/room.module';
import { RoomService } from './modules/rooms/room.service';
import { RegistrationPurposeModule } from './modules/registration-purpose/registration-purpose.module';
import { RegistrationPurposeService } from './modules/registration-purpose/registration-purpose.service';
import { ExamRoomsService } from './modules/exam-rooms/exam-rooms.service';
import { ExamRoomsModule } from './modules/exam-rooms/exam-rooms.module';
import { GenderModule } from './modules/gender/gender.module';
import { GenderService } from './modules/gender/gender.service';
import { ExamFormModule } from './modules/exam-form/exam-form.module';
import { ExamFormService } from './modules/exam-form/exam-form.service';
import { CountryModule } from './modules/country/country.module';
import { CountryService } from './modules/country/country.service';
@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'CATALOG_MICROSERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'catalog',
            brokers: ['localhost:9092'],
          },
          consumer: {
            groupId: 'api-catalog-consumer',
          },
        },
      },
    ]),
    EducationFormModule,
    EducationLanguageModule,
    AcademicDegreeModule,
    AcademicSubjectModule,
    EducationDirectionModule,
    DepartmentModule,
    PositionModule,
    AgreementPriceModule,
    RoomModule,
    RegistrationPurposeModule,
    ExamRoomsModule,
    GenderModule,
    ExamFormModule,
    CountryModule,
  ],
  exports: [
    CatalogService,
    EducationFormService,
    EducationLanguageService,
    AcademicDegreeService,
    AcademicSubjectService,
    EducationDirectionService,
    DepartmentService,
    PositionService,
    AgreementPriceService,
    RoomService,
    RegistrationPurposeService,
    ExamRoomsService,
    GenderService,
    ExamFormService,
    CountryService,
  ],
  providers: [
    CatalogService,
    EducationFormService,
    EducationLanguageService,
    AcademicDegreeService,
    AcademicSubjectService,
    EducationDirectionService,
    DepartmentService,
    PositionService,
    AgreementPriceService,
    RoomService,
    RegistrationPurposeService,
    ExamRoomsService,
    GenderService,
    ExamFormService,
    CountryService,
  ],
  controllers: [],
})
export class CatalogModule {}
