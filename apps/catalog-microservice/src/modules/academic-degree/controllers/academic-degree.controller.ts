import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AcademicDegreeService } from '../services/academic-degree.service';
import {
  CreateAcademicDegreeDto,
  GetResourceDto,
  UpdateAcademicDegreeDto,
} from '@edufin-back/shared/dto';

@Controller()
export class AcademicDegreeController {
  constructor(
    private readonly academicDegreeService: AcademicDegreeService
  ) {}
  @MessagePattern('get_catalog_academic_degree')
  get() {
    return this.academicDegreeService.findAll();
  }

  @MessagePattern('create_catalog_academic_degree')
  create(@Payload() createAcademicDegreeDto: CreateAcademicDegreeDto) {
    return this.academicDegreeService.create(createAcademicDegreeDto);
  }
  @MessagePattern('update_catalog_academic_degree')
  update(
    @Payload()
    payload: {
      id: string;
      updateAcademicDegreeDto: UpdateAcademicDegreeDto;
    }
  ) {
    return this.academicDegreeService.update(
      payload?.id,
      payload?.updateAcademicDegreeDto
    );
  }
  @MessagePattern('remove_catalog_academic_degree')
  remove(@Payload() payload: { id: string }) {
    return this.academicDegreeService.remove(payload?.id);
  }
  @MessagePattern('getResource_catalog_academic_degree')
  getResource(@Payload() getResourceDto: GetResourceDto) {
    return this.academicDegreeService.getResource(
      +getResourceDto?.page,
      +getResourceDto?.take,
      getResourceDto?.include,
      getResourceDto?.where
    );
  }
  @MessagePattern('findOne_catalog_academic_degree')
  getOne(@Payload() payload: { id; include }) {
    return this.academicDegreeService.findOne(
      payload?.id,
      payload?.include
    );
  }
}
