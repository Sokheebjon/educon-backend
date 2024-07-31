import { Controller, Get, Query } from '@nestjs/common';
import { buildController } from '@edufin-back/common/abstract';
import {
  CreateEducationFormDto,
  FilterEducationFormDto,
  UpdateEducationFormDto,
} from '@edufin-back/shared/dto';
import { EducationFormEntity } from '@edufin-back/shared/entities';
import { EducationFormService } from './education-form.service';

const BaseController = buildController({
  createDto: CreateEducationFormDto,
  model: EducationFormEntity,
  name: 'Education Form (Talim shakli)',
  updateDto: UpdateEducationFormDto,
});
@Controller("education-form")
export class EducationFormController extends BaseController {
  constructor(private readonly educationFormService: EducationFormService) {
    super(educationFormService);
  }
  @Get()
  findAll(@Query() filter:FilterEducationFormDto) {
    return this.educationFormService.findAll(filter);
  }

}
