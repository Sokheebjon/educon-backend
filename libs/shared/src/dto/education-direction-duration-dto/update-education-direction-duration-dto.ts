import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateEducationDirectionDurationDto } from './create-education-direction-duration-dto copy';

export class UpdateEducationDirectionDurationDto extends PartialType(
  CreateEducationDirectionDurationDto
) {
  @ApiProperty()
  id: string;
}
