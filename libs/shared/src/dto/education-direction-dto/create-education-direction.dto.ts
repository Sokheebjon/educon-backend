import { ApiProperty, OmitType } from '@nestjs/swagger';
import { EducationDirectionEntity } from '../../entities/education-direction.entity';
import { AcademicBlockEntity } from '../../entities/academic-block.entity';
import { EducationDirectionDurationEntity } from '../../entities/education-direction-duration.entity';

export class CreateEducationDirectionDto extends OmitType(
  EducationDirectionEntity,
  ['id', 'createdAt', 'updatedAt']
) {
  @ApiProperty({
    required: true,
    type: OmitType(AcademicBlockEntity, ['id',"subject"]),
    isArray: true,
  })
  academic_blocks: AcademicBlockEntity[];
  @ApiProperty({
    required: true,
   type: OmitType(EducationDirectionDurationEntity, ['id',"education_direction",'education_form',"education_direction_id"]),
    isArray: true,
  })
  duration: EducationDirectionDurationEntity[];
}
