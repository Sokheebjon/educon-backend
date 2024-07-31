import { Injectable } from '@nestjs/common';
import { ExamFormRepository } from '../repository/exam-form.repository';
import { ExamFormEntity } from '@edufin-back/shared/entities';

@Injectable()
export class ExamFormService {
  constructor(private readonly examFormRepository: ExamFormRepository) {}
  async findAll(): Promise<ExamFormEntity[] | { data: null }> {
    return await this.examFormRepository.findMany();
  }

  async findOne(id): Promise<ExamFormEntity> {
    return await this.examFormRepository.findOne(id);
  }
}
