import { Controller, Get, Query } from '@nestjs/common';
import { buildController } from '@edufin-back/common/abstract';

import { AcademicDegreeEntity } from 'libs/shared/src/entities/academic-degree.entity';
import {  EducationDirectionService } from './education-direction.service';
import  {CreateEducationDirectionDto, FilterEducationDirectionDto, UpdateEducationDirectionDto} from '@edufin-back/shared/dto';

const BaseController = buildController({
  createDto: CreateEducationDirectionDto,
  model: AcademicDegreeEntity,
  name: 'Education Direction (Talim yo\'nalishi)',
  updateDto: UpdateEducationDirectionDto,
});
@Controller("education-direction")
export class EducationDirectionController extends BaseController {
  constructor(private readonly educationDirectionService: EducationDirectionService) {
    super(educationDirectionService);
  }
  @Get()
  findAll(@Query() filter:FilterEducationDirectionDto) {
    return this.educationDirectionService.findAll(filter);
  } 
}
