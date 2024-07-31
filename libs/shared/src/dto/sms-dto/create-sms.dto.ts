import { ApiProperty } from '@nestjs/swagger';

export class CreateSmsDto {
  @ApiProperty()
  phone_numbers: string[];
  @ApiProperty()
  message: string;
}
