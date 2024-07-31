import {  OmitType } from '@nestjs/swagger';
import { EducationDirectionDurationEntity } from '../../entities/education-direction-duration.entity';

export class CreateEducationDirectionDurationDto extends OmitType(
  EducationDirectionDurationEntity,
  ['id','education_direction','education_form']
) {}
