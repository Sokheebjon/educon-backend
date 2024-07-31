import { ApiProperty, OmitType } from '@nestjs/swagger';
import { AgreementPriceEntity } from '../../entities/agreement-price.entity';
import { CreateAgreementPriceLimitsDto } from '../agreement-price-limits-dto';

export class CreateAgreementPriceDto extends OmitType(AgreementPriceEntity, [
  'id',
  'createdAt',
  'updatedAt',
  'education_direction',
  'education_form',
  'agreement_price_limits',
]) {
  @ApiProperty({ type: CreateAgreementPriceLimitsDto, isArray: true })
  agreement_price_limits: CreateAgreementPriceLimitsDto[];
}
