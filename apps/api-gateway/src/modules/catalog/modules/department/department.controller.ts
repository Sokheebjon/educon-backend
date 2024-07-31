import { Controller } from '@nestjs/common';
import { buildController } from '@edufin-back/common/abstract';
import {
  CreateDepartmentDto,
  UpdateDepartmentDto,
} from '@edufin-back/shared/dto';
import { DepartmentEntity } from 'libs/shared/src/entities/department.entity';
import { DepartmentService } from './department.service';

const BaseController = buildController({
  createDto: CreateDepartmentDto,
  model: DepartmentEntity,
  name: "Department (Bo'lim (xodim yaratish oynasi uchun))",
  updateDto: UpdateDepartmentDto,
});
@Controller('department')
export class DepartmentController extends BaseController {
  constructor(private readonly departmentService: DepartmentService) {
    super(departmentService);
  }
}
