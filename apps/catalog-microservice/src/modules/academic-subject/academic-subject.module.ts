import { Module } from '@nestjs/common';
import { CatalogPrismaModule } from '@edufin-back/catalog-prisma-client';
import { AcademicSubjectService } from './services/academic-subject.service';

@Module({
  imports: [CatalogPrismaModule],
  providers: [AcademicSubjectService],
  exports: [AcademicSubjectService],
})
export class AcademicSubjectModule {}
