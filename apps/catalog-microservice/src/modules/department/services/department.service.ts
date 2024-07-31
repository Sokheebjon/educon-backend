import { CatalogPrismaService } from '@edufin-back/catalog-prisma-client';
import { AbstractRepository } from '@edufin-back/common/abstract';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DepartmentService extends AbstractRepository {
  constructor(private readonly catalogPrismaService: CatalogPrismaService) {
    super(catalogPrismaService.department);
  }
}