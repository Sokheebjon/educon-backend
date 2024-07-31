import { Module } from '@nestjs/common';
import { CatalogPrismaModule } from '@edufin-back/catalog-prisma-client';
import { PositionService } from './services/position.service';

@Module({
  imports: [CatalogPrismaModule],
  providers: [PositionService],
  exports: [PositionService],
})
export class PositionModule {}
