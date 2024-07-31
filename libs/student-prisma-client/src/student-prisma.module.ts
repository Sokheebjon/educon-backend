import { Module } from '@nestjs/common';
import { StudentPrismaService } from './student-prisma.service';
@Module({
  providers: [StudentPrismaService],
  exports: [StudentPrismaService],
})
export default class StudentPrismaModule {}
