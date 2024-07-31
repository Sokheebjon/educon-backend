import { Module } from '@nestjs/common';
import { EducationFormService } from './services/education-form.service';
import { CatalogPrismaModule } from '@edufin-back/catalog-prisma-client';

@Module({
  imports: [ CatalogPrismaModule],
  providers: [EducationFormService],
  exports: [EducationFormService]
})
export class EducationFormModule {}
