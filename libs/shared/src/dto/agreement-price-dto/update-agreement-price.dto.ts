import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { CreateAgreementPriceDto } from './create-agreement-price.dto';
import { UpdateAgreementPriceLimitsDto } from '../agreement-price-limits-dto';

export class UpdateAgreementPriceDto extends PartialType(
  OmitType(CreateAgreementPriceDto,["agreement_price_limits"])
) {
  @ApiProperty({ type: UpdateAgreementPriceLimitsDto, isArray: true })
  agreement_price_limits: UpdateAgreementPriceLimitsDto[];
}
