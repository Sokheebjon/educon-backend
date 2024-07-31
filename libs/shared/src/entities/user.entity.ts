import { ApiProperty } from '@nestjs/swagger';
import { RoleEntity } from './role.entity';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UserEntity {
  @ApiProperty()
  id?: string;
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  firstName: string;
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  lastName: string;
  @ApiProperty()
  @IsNotEmpty()
  phoneNumber: string;
  @ApiProperty({required:false})
  roleId: string;
  @ApiProperty()
  @IsOptional()
  createdById: string;
  @ApiProperty({required:false})
  pinfl: string;
  @ApiProperty({required:false})
  position?: string;
  @ApiProperty({required:false})
  department?: string
  @ApiProperty({required:false})
  passport: string;
  @ApiProperty({required:false})
  photoId: string;
  @ApiProperty({required:false})
  isActive?: boolean;
  @ApiProperty({type:RoleEntity, required:false})
  role?: RoleEntity;
  passwordHash?: string;
  passwordAttempt?: number;
  @ApiProperty({type:UserEntity, required:false})
  createdBy?: UserEntity;
  @ApiProperty({type:UserEntity, required:false, isArray:true})
  userCreators?: UserEntity[];
  createdAt?: Date;
  updatedAt?: Date;
}
