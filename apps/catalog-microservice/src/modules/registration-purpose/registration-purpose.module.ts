import { Module } from '@nestjs/common';
import { CatalogPrismaModule } from '@edufin-back/catalog-prisma-client';
import { RegistrationPurposeService } from './services/registration-purpose.service';

@Module({
  imports: [CatalogPrismaModule],
  providers: [RegistrationPurposeService],
  exports: [RegistrationPurposeService],
})
export class RegistrationPurposeModule {}
