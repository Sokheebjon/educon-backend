import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateAgreementPriceLimitsDto } from './create-agreement-price-limits.dto';

export class UpdateAgreementPriceLimitsDto extends PartialType(
  CreateAgreementPriceLimitsDto
) {
  @ApiProperty()
  id:string
}
