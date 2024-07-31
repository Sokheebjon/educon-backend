import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateExamTimesDto } from './create-exam-times.dto';

export class UpdateExamTimesDto extends PartialType(CreateExamTimesDto) {
  @ApiProperty()
  id: string;
  @ApiProperty()
  time: string;
}
