import { Module } from '@nestjs/common';
import { CatalogPrismaModule } from '@edufin-back/catalog-prisma-client';
import { ExamRoomsService } from './services/exam-rooms.service';
import { ExamRoomsRepository } from './repository/exam-rooms.repository';

@Module({
  imports: [
    CatalogPrismaModule],
  providers: [ExamRoomsService, ExamRoomsRepository],
  exports: [ExamRoomsService],
})
export class ExamRoomsModule {}
