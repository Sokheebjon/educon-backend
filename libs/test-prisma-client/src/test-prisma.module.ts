import { Module } from '@nestjs/common';
import { TestPrismaService } from './test-prisma.service';
@Module({
  providers: [TestPrismaService],
  exports: [TestPrismaService],
})
export default class TestPrismaModule {}
