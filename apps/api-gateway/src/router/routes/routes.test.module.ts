import { Module } from '@nestjs/common';
import { TestController } from '../../modules/test/test.controller';
import { TestModule } from '../../modules/test/test.module';

@Module({
  controllers: [TestController],
  providers: [],
  exports: [],
  imports: [TestModule],
})
export class RoutesTestModule {}
