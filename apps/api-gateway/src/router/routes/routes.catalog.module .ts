import { Module } from '@nestjs/common';
import { EducationFormController } from '../../modules/catalog/modules/education-form/education-form.controller';
import { CatalogModule } from '../../modules/catalog/catalog.module';
import { EducationLanguageController } from '../../modules/catalog/modules/education-language/education-language.controller';
import { AcademicDegreeController } from '../../modules/catalog/modules/academic-degree/academic-degree.controller';
import { AcademicSubjectController } from '../../modules/catalog/modules/academic-subjects/academic-subject.controller';
import { EducationDirectionController } from '../../modules/catalog/modules/education-direction/education-direction.controller';
import { PositionController } from '../../modules/catalog/modules/position/position.controller';
import { DepartmentController } from '../../modules/catalog/modules/department/department.controller';
import { AgreementPriceController } from '../../modules/catalog/modules/agreement-price/agreement-price.controller';
import { RoomController } from '../../modules/catalog/modules/rooms/room.controller';
import { RegistrationPurposeController } from '../../modules/catalog/modules/registration-purpose/registration-purpose.controller';
import { ExamRoomsController } from '../../modules/catalog/modules/exam-rooms/exam-rooms.controller';
import { GenderController } from '../../modules/catalog/modules/gender/gender.controller';
import { ExamFormController } from '../../modules/catalog/modules/exam-form/exam-form.controller';
import { CountryController } from '../../modules/catalog/modules/country/country.controller';

@Module({
  controllers: [
    EducationFormController,
    EducationLanguageController,
    AcademicDegreeController,
    AcademicSubjectController,
    EducationDirectionController,
    PositionController,
    DepartmentController,
    AgreementPriceController,
    RoomController,
    RegistrationPurposeController,
    ExamRoomsController,
    GenderController,
    ExamFormController,
    CountryController,
  ],
  providers: [],
  exports: [],
  imports: [CatalogModule],
})
export class RoutesCatalogModule {}
