import { ApiProperty, OmitType } from '@nestjs/swagger';
import { ExamRoomsEntity } from '../../entities/exam-rooms.entity';
import { CreateExamTimesDto } from '../exam-times-dto';
import { IsArray } from 'class-validator';

export class CreateExamRoomsDto extends OmitType(ExamRoomsEntity, [
  'id',
  'education_direction',
  'exam_date_formatted',
  'exam_times',
  'room',
]) {
  @IsArray()
  @ApiProperty({ type: CreateExamTimesDto, isArray: true })
  exam_times: CreateExamTimesDto[];
}
