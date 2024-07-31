import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class BaseNameEntity {
  @ApiProperty({ required: false })
  id?: string;
  @ApiProperty({ required: true })
  @IsString()
  nameUz: string;
  @ApiProperty({ required: true })
  @IsString()
  nameRu: string;
  @ApiProperty({ required: true })
  @IsString()
  nameEn: string;

  createdAt?: Date;
  updatedAt?: Date;
}
