import { Module } from '@nestjs/common';
import { EducationLanguageService } from './services/education-language.service';
import { CatalogPrismaModule } from '@edufin-back/catalog-prisma-client';

@Module({
  imports: [ CatalogPrismaModule],
  providers: [EducationLanguageService],
  exports: [EducationLanguageService]
})
export class EducationLanguageModule {}
