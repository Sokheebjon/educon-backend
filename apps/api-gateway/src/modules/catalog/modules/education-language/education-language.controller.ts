import { Controller, Get, Query } from '@nestjs/common';
import { buildController } from '@edufin-back/common/abstract';
import {
  CreateEducationLanguageDto,
  FilterEducationLanguageDto,
  UpdateEducationLanguageDto,
} from '@edufin-back/shared/dto';
import { EducationFormEntity } from '@edufin-back/shared/entities';
import { EducationLanguageService } from './education-language.service';

const BaseController = buildController({
  createDto: CreateEducationLanguageDto,
  model: EducationFormEntity,
  name: 'Education Language (Talim tili)',
  updateDto: UpdateEducationLanguageDto,
});
@Controller("education-language")
export class EducationLanguageController extends BaseController {
  constructor(private readonly educationLanguageService: EducationLanguageService) {
    super(educationLanguageService);
  }
  @Get()
  findAll(@Query() filter:FilterEducationLanguageDto) {
    return this.educationLanguageService.findAll(filter);
  }
}
