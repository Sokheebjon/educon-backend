import { OmitType } from '@nestjs/swagger';
import { ExamTimesEntity } from '../../entities/exam-times.entity';

export class CreateExamTimesDto extends OmitType(ExamTimesEntity, [
  'id',
  'createdAt',
  'updatedAt',
  'exam_room',
  'exam_room_id',
]) {}
