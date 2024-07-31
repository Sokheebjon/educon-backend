import { ApiProperty } from '@nestjs/swagger';

export class FileEntity {
  @ApiProperty()
  id?: string;
  @ApiProperty()
  orginal_name: string;
  @ApiProperty()
  url: string;
  @ApiProperty()
  mime_type: string;
  @ApiProperty()
  size: number;
  createdAt: Date;
  updatedAt: Date;
}
