import { OmitType } from '@nestjs/swagger';
import { AgreementPriceLimitsEntity } from '../../entities/agreement-price-limit.entity';

export class CreateAgreementPriceLimitsDto extends OmitType(
  AgreementPriceLimitsEntity,
  ['id']
) {}
