import { ApiProperty } from '@nestjs/swagger';

export class GetContractPayloadDto {
  @ApiProperty({ required: false })
  score: number;

  @ApiProperty({ required: false })
  isDownload: boolean;

}
