import { ApiProperty } from '@nestjs/swagger';
import { IsJSON, IsOptional } from 'class-validator';

export class GetResourceDto {
  @ApiProperty({default:"0"})
  page:string = '0';

  @ApiProperty({default:"10"})
  take:string = '10';

  @IsOptional()
  @IsJSON()
  @ApiProperty({ description: 'only JSON', required:false })
  include?: string;

  @IsOptional()
  @IsJSON()
  @ApiProperty({ description: 'only JSON', required:false })
  where?: string;
}
