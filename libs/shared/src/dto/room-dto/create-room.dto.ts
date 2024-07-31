import { OmitType } from '@nestjs/swagger';
import { RoomEntity } from '../../entities/room.entity';

export class CreateRoomDto extends OmitType(RoomEntity, [
  'id',
  'createdAt',
  'updatedAt',
  'responsible_person',
]) {}
