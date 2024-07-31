import { Controller } from '@nestjs/common';
import { buildController } from '@edufin-back/common/abstract';
import {
   CreateAcademicSubjectDto, UpdateAcademicSubjectDto,
} from '@edufin-back/shared/dto';
import { AcademicSubjectService } from './academic-subject.service';
import { AcademicSubjectEntity } from '@edufin-back/shared/entities';

const BaseController = buildController({
  createDto: CreateAcademicSubjectDto,
  model: AcademicSubjectEntity,
  name: 'Academic Subject Form (Fanlar)',
  updateDto: UpdateAcademicSubjectDto,
});
@Controller("academic-subject")
export class AcademicSubjectController extends BaseController {
  constructor(private readonly academicSubjectService: AcademicSubjectService) {
    super(academicSubjectService);
  }
}
