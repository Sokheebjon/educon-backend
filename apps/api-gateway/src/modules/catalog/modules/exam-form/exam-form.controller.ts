import { Controller, Get, Param } from '@nestjs/common';

import { ApiTags } from '@nestjs/swagger';
import { ExamFormService } from './exam-form.service';
import { Public } from '@edufin-back/common/decorators';

@ApiTags('ExamForm')
@Controller('exam-form')
export class ExamFormController {
  constructor(private readonly examFormService: ExamFormService) {}
  @Public()
  @Get()
  findAll() {
    return this.examFormService.findAll();
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.examFormService.findOne(id);
  }
}
