import { ApiProperty } from '@nestjs/swagger';
import { BaseNameEntity } from './catalog-base.entity';

export class EducationFormEntity extends BaseNameEntity  {
    @ApiProperty()
    allowed_courses: number[];
    @ApiProperty()
    isExistInUniversity:boolean
  
}
