import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { RegistrationEntity } from '../../entities/registration.entity';

export class UpdateRegistrationDto extends PartialType(
  OmitType(RegistrationEntity, [
    'education_direction',
    'id',
    'education_form',
    'education_language',
    'exam_form',
    'registration_purpose',
    'gender',
    'exam_rooms',
    'exam_times_in_rooms',
    'studied_education_form',
    'dtm_file',
    'ielts_file',
    'diplom_file',
    'passport_file',
    'status',
  ])
) {
  @ApiProperty()
  step?: number;
}
