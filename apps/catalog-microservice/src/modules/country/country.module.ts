import { Module } from '@nestjs/common';
import { CatalogPrismaModule } from '@edufin-back/catalog-prisma-client';
import { CountryService } from './services/country.service';

@Module({
  imports: [CatalogPrismaModule],
  providers: [CountryService],
  exports: [CountryService],
})
export class CountryModule {}
