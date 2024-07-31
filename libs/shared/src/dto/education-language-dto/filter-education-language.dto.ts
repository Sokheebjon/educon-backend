import { ApiProperty } from '@nestjs/swagger';

export class FilterEducationLanguageDto {
  @ApiProperty({ required: false })
  education_direction_id: string;
}
