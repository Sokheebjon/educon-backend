import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { EducationFormService } from '../services/education-form.service';
import {
  CreateEducationFormDto,
  FilterEducationFormDto,
  GetResourceDto,
  UpdateEducationFormDto,
} from '@edufin-back/shared/dto';

@Controller()
export class EducationFormController {
  constructor(private readonly educationFormService: EducationFormService) {}
  @MessagePattern('get_catalog_education_form')
  get(@Payload() filter: FilterEducationFormDto) {
    return this.educationFormService.findAll(filter);
  }
  @MessagePattern('create_catalog_education_form')
  create(@Payload() createEducationFormDto: CreateEducationFormDto) {
    return this.educationFormService.create(createEducationFormDto);
  }
  @MessagePattern('update_catalog_education_form')
  update(
    @Payload()
    payload: {
      id: string;
      updateEducationFormDto: UpdateEducationFormDto;
    }
  ) {
    return this.educationFormService.update(
      payload?.id,
      payload?.updateEducationFormDto
    );
  }
  @MessagePattern('remove_catalog_education_form')
  remove(@Payload() payload: { id: string }) {
    return this.educationFormService.remove(payload?.id);
  }
  @MessagePattern('getResource_catalog_education_form')
  getResource(@Payload() getResourceDto: GetResourceDto) {
    return this.educationFormService.getResource(
      +getResourceDto?.page,
      +getResourceDto?.take
    );
  }
  @MessagePattern('findOne_catalog_education_form')
  getOne(@Payload() payload: { id; include }) {
    return this.educationFormService.findOne(payload?.id, payload?.include);
  }
}
