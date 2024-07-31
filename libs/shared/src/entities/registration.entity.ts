import { ApiProperty } from '@nestjs/swagger';
import { RegistrationPurposeEntity } from './registration-purpose.entity';
import { GenderEntity } from './gender.entity';
import { EducationDirectionEntity } from './education-direction.entity';
import { EducationFormEntity } from './education-form.entity';
import { EducationLanguageEntity } from './education-language.entity';
import { ExamFormEntity } from './exam-form.entity';
import { ExamRoomsEntity } from './exam-rooms.entity';
import { ExamTimesEntity } from './exam-times.entity';
import { IsString } from 'class-validator';
import { FileEntity } from './file.entity';
import {
  Application,
  ApplicationStatus,
} from '@edufin-back/student-prisma-client';

export class RegistrationEntity implements Application {
  @ApiProperty()
  studied_education_direction_cyrl: string;
  @ApiProperty()
  comment: string;
  @ApiProperty()
  studied_university_cyrl: string;
  @ApiProperty()
  id: string;
  @ApiProperty()
  citizenship: string;
  @ApiProperty()
  birth_place: string;
  @ApiProperty()
  pinfl: string;
  @ApiProperty()
  name_cyrl: string;
  @ApiProperty()
  surname_cyrl: string;
  @ApiProperty()
  middlename_cyrl: string;
  @ApiProperty()
  nationality: string;
  @ApiProperty()
  is_contract_generated: boolean;
  @ApiProperty()
  studied_direction: string;
  @ApiProperty()
  @IsString()
  first_name: string;
  @ApiProperty()
  @IsString()
  last_name: string;
  @ApiProperty()
  @IsString()
  father_name: string;
  @ApiProperty()
  @IsString()
  primary_phone: string;
  @ApiProperty()
  secondary_phone: string;
  @ApiProperty()
  registration_purpose_id: string;
  @ApiProperty()
  registration_purpose?: RegistrationPurposeEntity;
  @ApiProperty()
  passport: string;
  @ApiProperty()
  birth_date: Date;
  @ApiProperty()
  gender_id: number;
  @ApiProperty()
  gender?: GenderEntity;
  @ApiProperty()
  education_direction_id: string;
  @ApiProperty()
  education_direction?: EducationDirectionEntity;
  @ApiProperty()
  studied_education_direction: string;
  @ApiProperty()
  education_form_id: string;
  @ApiProperty()
  education_form?: EducationFormEntity;
  @ApiProperty()
  studied_education_form_id: string;
  @ApiProperty()
  studied_education_form?: EducationFormEntity;
  @ApiProperty()
  education_language_id: string;
  @ApiProperty()
  education_language?: EducationLanguageEntity;
  @ApiProperty()
  passport_file_id: string;
  @ApiProperty()
  passport_file?: FileEntity;
  @ApiProperty()
  diplom_file_id: string;
  @ApiProperty()
  diplom_file?: FileEntity;
  @ApiProperty()
  ielts_file_id: string;
  @ApiProperty()
  ielts_file?: FileEntity;
  @ApiProperty()
  dtm_file_id: string;
  @ApiProperty()
  dtm_file?: FileEntity;
  @ApiProperty()
  exam_form_id: number;
  @ApiProperty()
  exam_form?: ExamFormEntity;
  @ApiProperty()
  exam_rooms_id: string;
  @ApiProperty()
  exam_rooms?: ExamRoomsEntity;
  @ApiProperty()
  exam_times_in_rooms_id: string;
  @ApiProperty()
  exam_times_in_rooms?: ExamTimesEntity;
  @ApiProperty()
  studied_country: string;
  @ApiProperty()
  studied_university: string;
  @ApiProperty()
  finished_course: number;
  @ApiProperty()
  starting_course: number;
  @ApiProperty()
  step: number;
  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  updatedAt: Date;
  @ApiProperty()
  exam_end_time: Date;
  @ApiProperty()
  status: ApplicationStatus;
  @ApiProperty()
  application_number: number;
  crm_id: number;
  crm_contact_id: number;
  @ApiProperty()
  contract_generated_date: Date;
  @ApiProperty()
  contract_number: string;
  @ApiProperty()
  total_score: number;
  @ApiProperty()
  course: string;
  @ApiProperty()
  contract_summa: number;
}
