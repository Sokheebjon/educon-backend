import { Global, Module } from '@nestjs/common';
import HelperHashService from './helper.hash.service';
import HelperEncryptionService from './helper.encryption.service';
import HelperDateService from './helper.date.service';
import { JwtModule } from '@nestjs/jwt';
import { HttpModule } from '@nestjs/axios';

@Global()
@Module({
  providers: [
    HelperDateService,
    HelperEncryptionService,
    HelperHashService,
  ],
  exports: [
    HelperDateService,
    HelperEncryptionService,
    HelperHashService,
  ],

  controllers: [],
  imports: [JwtModule, HttpModule],
})
export default class HelperModule {}
