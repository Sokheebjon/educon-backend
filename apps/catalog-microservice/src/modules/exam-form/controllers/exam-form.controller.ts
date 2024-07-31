import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ExamFormService } from '../services/exam-form.service';

@Controller()
export class ExamFormController {
  constructor(private readonly examFormService: ExamFormService) {}
  @MessagePattern('get_catalog_exam_form')
  get() {
    return this.examFormService.findAll();
  }

  @MessagePattern('findOne_catalog_exam_form')
  getOne(@Payload() payload: { id }) {
    return this.examFormService.findOne(payload?.id);
  }
}
