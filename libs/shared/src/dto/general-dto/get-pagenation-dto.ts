import { ApiProperty } from '@nestjs/swagger';

export class GetPagenationDto {
  @ApiProperty({ default: '0' })
  page: string = '0';

  @ApiProperty({ default: '10' })
  take: string = '10';
}
