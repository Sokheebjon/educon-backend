import { Module } from '@nestjs/common';
import { GeneralPrismaService } from './general-prisma.service';
@Module({
  providers: [GeneralPrismaService],
  exports: [GeneralPrismaService],
})
export default class GeneralPrismaModule {}
