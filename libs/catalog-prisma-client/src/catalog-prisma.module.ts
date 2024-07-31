import { Module } from '@nestjs/common';
import { CatalogPrismaService } from './catalog-prisma.service';
@Module({
  providers: [CatalogPrismaService],
  exports: [CatalogPrismaService],
})
export default class CatalogPrismaModule {}
