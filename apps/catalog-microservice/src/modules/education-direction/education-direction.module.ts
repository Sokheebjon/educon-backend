import { Module } from '@nestjs/common';
import {
  CatalogPrismaModule,
 
} from '@edufin-back/catalog-prisma-client';
import { EducationDirectionService } from './services/education-direction.service';
import { EducationDirectionRepository } from './repository/education-direction.repository';

@Module({
  imports: [CatalogPrismaModule],
  providers: [EducationDirectionService, EducationDirectionRepository],
  exports: [EducationDirectionService],
})
export class EducationDirectionModule {}
