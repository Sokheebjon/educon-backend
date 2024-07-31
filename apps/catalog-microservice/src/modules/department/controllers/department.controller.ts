import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { DepartmentService } from '../services/department.service';
import {
  CreateDepartmentDto,
  GetResourceDto,
  UpdateDepartmentDto,
} from '@edufin-back/shared/dto';

@Controller()
export class DepartmentController {
  constructor(
    private readonly departmentService: DepartmentService
  ) {}
  @MessagePattern('get_catalog_department')
  get() {
    return this.departmentService.findAll();
  }

  @MessagePattern('create_catalog_department')
  create(@Payload() createDepartmentDto: CreateDepartmentDto) {
    return this.departmentService.create(createDepartmentDto);
  }
  @MessagePattern('update_catalog_department')
  update(
    @Payload()
    payload: {
      id: string;
      updateDepartmentDto: UpdateDepartmentDto;
    }
  ) {
    return this.departmentService.update(
      payload?.id,
      payload?.updateDepartmentDto
    );
  }
  @MessagePattern('remove_catalog_department')
  remove(@Payload() payload: { id: string }) {
    return this.departmentService.remove(payload?.id);
  }
  @MessagePattern('getResource_catalog_department')
  getResource(@Payload() getResourceDto: GetResourceDto) {
    return this.departmentService.getResource(
      +getResourceDto?.page,
      +getResourceDto?.take,
      getResourceDto?.include,
      getResourceDto?.where
    );
  }
  @MessagePattern('findOne_catalog_department')
  getOne(@Payload() payload: { id; include }) {
    return this.departmentService.findOne(
      payload?.id,
      payload?.include
    );
  }
}
