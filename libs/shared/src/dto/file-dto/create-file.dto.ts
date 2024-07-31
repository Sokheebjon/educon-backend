import { ApiProperty } from '@nestjs/swagger';

export class CreatefileDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  file: any
}
