import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateExamRoomsDto } from './create-exam-rooms.dto';
import { UpdateExamTimesDto } from '../exam-times-dto';

export class UpdateExamRoomsDto extends PartialType(CreateExamRoomsDto) {
  @ApiProperty({ type: UpdateExamTimesDto, isArray: true })
  exam_times: UpdateExamTimesDto[];
}
