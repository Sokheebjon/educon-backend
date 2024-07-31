import { ApiProperty } from '@nestjs/swagger';

import { EducationDirectionEntity } from './education-direction.entity';
import { RoomEntity } from './room.entity';
import { ExamTimesEntity } from './exam-times.entity';
import { IsNumber, IsString } from 'class-validator';

export class ExamRoomsEntity {
  @ApiProperty()
  id?: string;
  @ApiProperty()
  @IsString()
  education_direction_id: string;
  @ApiProperty()
  @IsString()
  room_id: string;
  @ApiProperty()
  @IsNumber()
  room_capacity: number;
  @ApiProperty()
  @IsString()
  exam_date: Date;
  @ApiProperty({ type: ExamTimesEntity, isArray: true })
  exam_times?: ExamTimesEntity[];

  exam_date_formatted?: string;
  education_direction?: EducationDirectionEntity;
  room?: RoomEntity;
}
