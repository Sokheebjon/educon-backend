import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { CreateEducationDirectionDto } from './create-education-direction.dto';
import { AcademicBlockEntity } from '../../entities/academic-block.entity';
import { EducationDirectionDurationEntity } from '../../entities/education-direction-duration.entity';

export class UpdateEducationDirectionDto extends PartialType(
  CreateEducationDirectionDto
) {
  @ApiProperty({
    required: true,
    type: OmitType(AcademicBlockEntity, ['subject']),
  })
  academic_blocks: AcademicBlockEntity[];
  @ApiProperty({
    required: true,
    type: OmitType(EducationDirectionDurationEntity, [
      'education_direction',
      'education_form',
      'education_direction_id'
    ]),
    isArray: true,
  })
  duration: EducationDirectionDurationEntity[];
}
