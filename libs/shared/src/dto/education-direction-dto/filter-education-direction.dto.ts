import { ApiProperty } from '@nestjs/swagger';

export class FilterEducationDirectionDto {
  @ApiProperty({ required: false })
  academic_degree_id: string;
  @ApiProperty({ required: false })
  registration_purpose_id: string;
  @ApiProperty({ required: false })
  allowed_course: number;
}
