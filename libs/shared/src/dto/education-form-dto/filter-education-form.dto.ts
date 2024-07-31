import { ApiProperty } from '@nestjs/swagger';

export class FilterEducationFormDto {
  @ApiProperty({ required: false })
  education_direction_id: string;
  @ApiProperty({ required: false })
  registration_purpose_id: string;
  @ApiProperty({ required: false })
  allowed_course: number;
}
