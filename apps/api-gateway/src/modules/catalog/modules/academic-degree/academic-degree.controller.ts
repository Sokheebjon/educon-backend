import { Controller } from '@nestjs/common';
import { buildController } from '@edufin-back/common/abstract';
import {
  CreateAcademicDegreeDto, UpdateAcademicDegreeDto,
} from '@edufin-back/shared/dto';
import { AcademicDegreeEntity } from 'libs/shared/src/entities/academic-degree.entity';
import { AcademicDegreeService } from './academic-degree.service';

const BaseController = buildController({
  createDto: CreateAcademicDegreeDto,
  model: AcademicDegreeEntity,
  name: 'Academic Degree Form (Talim turi (Academic degree))',
  updateDto: UpdateAcademicDegreeDto,
});
@Controller("academic-degree")
export class AcademicDegreeController extends BaseController {
  constructor(private readonly academicDegreeService: AcademicDegreeService) {
    super(academicDegreeService);
  }
}
