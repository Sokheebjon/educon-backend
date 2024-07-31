import { Module } from '@nestjs/common';
import { AgreementPriceService } from './services/agreement-price.service';
import { CatalogPrismaModule } from '@edufin-back/catalog-prisma-client';

@Module({
  imports: [CatalogPrismaModule],
  providers: [AgreementPriceService],
  exports: [AgreementPriceService],
})
export class AgreementPriceModule {}
