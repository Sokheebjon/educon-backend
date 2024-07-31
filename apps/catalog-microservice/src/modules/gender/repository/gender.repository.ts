import { CatalogPrismaService } from '@edufin-back/catalog-prisma-client';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GenderRepository {
  constructor(private readonly catalogPrismaService: CatalogPrismaService) {}
  async findMany() {
    return await this.catalogPrismaService.gender.findMany({});
  }

  async findOne(id: string) {
    return await this.catalogPrismaService.gender.findUnique({
      where: { id: +id },
    });
  }
}
