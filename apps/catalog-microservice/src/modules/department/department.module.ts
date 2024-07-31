import { Module } from '@nestjs/common';
import { DepartmentService } from './services/department.service';
import { CatalogPrismaModule } from '@edufin-back/catalog-prisma-client';

@Module({
  imports: [CatalogPrismaModule],
  providers: [DepartmentService],
  exports: [DepartmentService],
})
export class DepartmentModule {}
