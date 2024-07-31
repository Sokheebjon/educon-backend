import { ApiProperty, OmitType } from '@nestjs/swagger';
import { UserEntity } from '../../entities/user.entity';

export class CreateUserDto extends OmitType(UserEntity, [
  'id',
  'createdAt',
  'createdAt',
  'passwordAttempt',
  'passwordHash',
  'role',
  'userCreators',
  "createdBy"
]) {
  @ApiProperty({required:false})
  password?: string;
}
