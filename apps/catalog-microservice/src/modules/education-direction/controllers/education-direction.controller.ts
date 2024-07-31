import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { EducationDirectionService } from '../services/education-direction.service';
import {
  CreateEducationDirectionDto,
  FilterEducationDirectionDto,
  GetResourceDto,
  UpdateEducationDirectionDto,
} from '@edufin-back/shared/dto';

@Controller()
export class EducationDirectionController {
  constructor(
    private readonly educationDirectionService: EducationDirectionService
  ) {}
  @MessagePattern('get_catalog_education_direction')
  get(@Payload() filter: FilterEducationDirectionDto) {
    return this.educationDirectionService.findAll(filter);
  }
  @MessagePattern('create_catalog_education_direction')
  create(@Payload() createEducationDirectionDto: CreateEducationDirectionDto) {
    return this.educationDirectionService.create(createEducationDirectionDto);
  }
  @MessagePattern('update_catalog_education_direction')
  update(
    @Payload()
    payload: {
      id: string;
      updateEducationDirectionDto: UpdateEducationDirectionDto;
    }
  ) {
    return this.educationDirectionService.update(
      payload?.id,
      payload?.updateEducationDirectionDto
    );
  }
  @MessagePattern('remove_catalog_education_direction')
  remove(@Payload() payload: { id: string }) {
    return this.educationDirectionService.remove(payload?.id);
  }
  @MessagePattern('getResource_catalog_education_direction')
  getResource(@Payload() getResourceDto: GetResourceDto) {
    return this.educationDirectionService.getResource(
      +getResourceDto?.page,
      +getResourceDto?.take
    );
  }
  @MessagePattern('findOne_catalog_education_direction')
  getOne(@Payload() payload: { id,education_form_id }) {
    return this.educationDirectionService.findOne(payload?.id, payload?.education_form_id);
  }
}
