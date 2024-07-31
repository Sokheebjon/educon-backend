import { Module } from '@nestjs/common';
import { AcademicDegreeService } from './services/academic-degree.service';
import { CatalogPrismaModule } from '@edufin-back/catalog-prisma-client';

@Module({
  imports: [CatalogPrismaModule],
  providers: [AcademicDegreeService],
  exports: [AcademicDegreeService],
})
export class AcademicDegreeModule {}
