import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreatefileDto } from './create-file.dto';

export class UpdateTestAnswerDto extends PartialType(CreatefileDto) {
  @ApiProperty()
  id: string;
}
