import { Module } from '@nestjs/common';
import { CatalogPrismaModule } from '@edufin-back/catalog-prisma-client';
import { GenderService } from './services/gender.service';
import { GenderRepository } from './repository/gender.repository';

@Module({
  imports: [CatalogPrismaModule],
  providers: [GenderService, GenderRepository],
  exports: [GenderService],
})
export class GenderModule {}
