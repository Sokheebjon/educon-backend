import { ApiProperty } from '@nestjs/swagger';
import { GetPagenationDto } from '../general-dto';
import { ApplicationStatus } from '@edufin-back/student-prisma-client';

export class GetRegistartionListByFilterDto extends GetPagenationDto {
  @ApiProperty({ required: false })
  is_contract_generated:boolean
  @ApiProperty({ required: false })
  search?: string;
  @ApiProperty({ required: false })
  primary_phone: string;
  @ApiProperty({ required: false })
  secondary_phone: string;
  @ApiProperty({ required: false })
  registration_purpose_id: string;
  @ApiProperty({ required: false })
  passport: string;
  @ApiProperty({ required: false })
  gender_id: number;
  @ApiProperty({ required: false })
  education_direction_id: string;
  @ApiProperty({ required: false })
  studied_education_direction: string;
  @ApiProperty({ required: false })
  studied_country: string;
  @ApiProperty({ required: false })
  studied_university: string;
  @ApiProperty({ required: false })
  education_language_id: string;
  @ApiProperty({ required: false })
  finished_course: string;
  @ApiProperty({ required: false })
  sort: "contract_generated_date";
  @ApiProperty({ required: false })
  starting_course: string;
  @ApiProperty({
    required: false,
    enum: ApplicationStatus,
    enumName: 'ApplicationStatus',
  })
  status: ApplicationStatus;
  @ApiProperty({ required: false })
  education_form_id: string;
}
