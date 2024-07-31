import { Module } from '@nestjs/common';
import { CatalogPrismaModule } from '@edufin-back/catalog-prisma-client';
import { ExamFormService } from './services/exam-form.service';
import { ExamFormRepository } from './repository/exam-form.repository';

@Module({
  imports: [CatalogPrismaModule],
  providers: [ExamFormService, ExamFormRepository],
  exports: [ExamFormService],
})
export class ExamFormModule {}
