import { ApplicationStatus } from '@edufin-back/student-prisma-client';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';

export class UpdateRegistrationStatusDto {
  @ApiProperty({ enum: ApplicationStatus, enumName: 'ApplicationStatus' })
  @IsEnum(ApplicationStatus)
  status: ApplicationStatus;
  @ApiProperty()
  @IsString()
  id: string;
  @ApiProperty()
  @IsOptional()
  comment?: string;
}
