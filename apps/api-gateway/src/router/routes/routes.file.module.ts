import { Module } from '@nestjs/common';
import { FileController } from '../../modules/file/file.controller';
import { FileModule } from '../../modules/file/file.module';

@Module({
  controllers: [FileController],
  providers: [],
  exports: [],
  imports: [FileModule],
})
export class RoutesFileModule {}
