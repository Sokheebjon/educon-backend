import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommonModule } from '../common/common.module';
import { CatalogPrismaModule } from '@edufin-back/catalog-prisma-client';
import { EducationFormController } from '../modules/education-form/controllers/education-form.controller';
import { EducationFormModule } from '../modules/education-form/education-form.module';
import { EducationLanguageController } from '../modules/education-language/controllers/education-language.controller';
import { EducationLanguageModule } from '../modules/education-language/education-language.module';
import { AcademicDegreeModule } from '../modules/academic-degree/academic-degree.module';
import { AcademicDegreeController } from '../modules/academic-degree/controllers/academic-degree.controller';
import { AcademicSubjectModule } from '../modules/academic-subject/academic-subject.module';
import { AcademicSubjectController } from '../modules/academic-subject/controllers/academic-subject.controller';
import { EducationDirectionModule } from '../modules/education-direction/education-direction.module';
import { EducationDirectionController } from '../modules/education-direction/controllers/education-direction.controller';
import { DepartmentModule } from '../modules/department/department.module';
import { DepartmentController } from '../modules/department/controllers/department.controller';
import { PositionModule } from '../modules/position/position.module';
import { PositionController } from '../modules/position/controllers/position.controller';
import { AgreementPriceModule } from '../modules/agreement-price/agreement-price.module';
import { AgreementPriceController } from '../modules/agreement-price/controllers/agreement-price.controller';
import { RoomController } from '../modules/rooms/controllers/room.controller';
import { RoomModule } from '../modules/rooms/room.module';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { RegistrationPurposeModule } from '../modules/registration-purpose/registration-purpose.module';
import { RegistrationPurposeController } from '../modules/registration-purpose/controllers/registration-purpose.controller';
import { ExamRoomsModule } from '../modules/exam-rooms/exam-rooms.module';
import { ExamRoomsController } from '../modules/exam-rooms/controllers/exam-rooms.controller';
import { GenderModule } from '../modules/gender/gender.module';
import { ExamFormModule } from '../modules/exam-form/exam-form.module';
import { GenderController } from '../modules/gender/controllers/gender.controller';
import { ExamFormController } from '../modules/exam-form/controllers/exam-form.controller';
import { CountryModule } from '../modules/country/country.module';
import { CountryController } from '../modules/country/controllers/country.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'AUTH_MICROSERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'test',
            brokers: ['localhost:9092'],
          },
          consumer: {
            groupId: 'catalog-auth-consumer',
          },
        },
      },
    ]),
    CommonModule,
    CatalogPrismaModule,
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
    CountryModule
  ],
  controllers: [
    AppController,
    EducationFormController,
    EducationLanguageController,
    AcademicDegreeController,
    AcademicSubjectController,
    EducationDirectionController,
    DepartmentController,
    PositionController,
    AgreementPriceController,
    RoomController,
    RegistrationPurposeController,
    ExamRoomsController,
    GenderController,
    ExamFormController,
    CountryController
  ],
  providers: [AppService],
})
export class AppModule {}
