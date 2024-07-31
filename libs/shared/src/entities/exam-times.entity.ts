import { ApiProperty } from '@nestjs/swagger';
import { ExamRoomsEntity } from './exam-rooms.entity';

export class ExamTimesEntity {
  @ApiProperty()
  id?: string;
  @ApiProperty()
  time: string;

  exam_room_id: string;
  exam_room?: ExamRoomsEntity;
  createdAt?: Date;
  updatedAt?: Date;
}
