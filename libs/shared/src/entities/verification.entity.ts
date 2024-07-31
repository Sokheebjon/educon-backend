import { ApiProperty } from '@nestjs/swagger';

export class VerificationEntity {
  @ApiProperty()
  id?: string;
  @ApiProperty()
  code: string;
  @ApiProperty()
  phoneNumber: string;
  createdAt: Date;
  expiredAt: Date;
}
