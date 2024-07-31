import { ApiProperty } from '@nestjs/swagger';
import { BaseNameEntity } from './catalog-base.entity';
import { UserEntity } from './user.entity';

export class RoomEntity extends BaseNameEntity {
  @ApiProperty()
  room_number: number;
  @ApiProperty()
  responsible_person_id: string;
  @ApiProperty()
  capacity: number;
  @ApiProperty()
  phone_number: string;
  @ApiProperty()
  responsible_person?: UserEntity;
}
