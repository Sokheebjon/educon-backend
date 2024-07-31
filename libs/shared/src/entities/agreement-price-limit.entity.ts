import { ApiProperty } from "@nestjs/swagger";

export class AgreementPriceLimitsEntity {
    @ApiProperty()
    id: string;
    @ApiProperty()
    from_score: number;
    @ApiProperty()
    to_score: number;
    @ApiProperty()
    price: number;
    @ApiProperty()
    price_in_text: string;
  }