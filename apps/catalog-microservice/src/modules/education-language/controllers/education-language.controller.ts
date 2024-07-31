import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { EducationLanguageService } from '../services/education-language.service';
import {
  CreateEducationLanguageDto,
  FilterEducationLanguageDto,
  GetResourceDto,
  UpdateEducationLanguageDto,
} from '@edufin-back/shared/dto';

@Controller()
export class EducationLanguageController {
  constructor(
    private readonly educationLanguageService: EducationLanguageService
  ) {}
  @MessagePattern('get_catalog_education_language')
  getList(filter: FilterEducationLanguageDto) {
    return this.educationLanguageService.findAll(filter);
  }
  @MessagePattern('create_catalog_education_language')
  create(@Payload() createEducationLanguageDto: CreateEducationLanguageDto) {
    return this.educationLanguageService.create(createEducationLanguageDto);
  }
  @MessagePattern('update_catalog_education_language')
  update(
    @Payload()
    payload: {
      id: string;
      updateEducationLanguageDto: UpdateEducationLanguageDto;
    }
  ) {
    return this.educationLanguageService.update(
      payload?.id,
      payload?.updateEducationLanguageDto
    );
  }
  @MessagePattern('remove_catalog_education_language')
  remove(@Payload() payload: { id: string }) {
    return this.educationLanguageService.remove(payload?.id);
  }
  @MessagePattern('getResource_catalog_education_language')
  getResource(@Payload() getResourceDto: GetResourceDto) {
    return this.educationLanguageService.getResource(
      +getResourceDto?.page,
      +getResourceDto?.take
    );
  }
  @MessagePattern('findOne_catalog_education_language')
  getOne(@Payload() payload: { id; include }) {
    return this.educationLanguageService.findOne(payload?.id, payload?.include);
  }
}
