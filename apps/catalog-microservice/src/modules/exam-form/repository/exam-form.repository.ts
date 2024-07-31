import { CatalogPrismaService } from '@edufin-back/catalog-prisma-client';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ExamFormRepository {
  constructor(private readonly catalogPrismaService: CatalogPrismaService) {}
  async findMany() {
    return await this.catalogPrismaService.examForm.findMany({});
  }

  async findOne(id: string) {
    return await this.catalogPrismaService.examForm.findUnique({
      where: { id: +id },
    });
  }
}
