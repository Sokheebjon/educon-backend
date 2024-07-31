import { ApiProperty, OmitType } from '@nestjs/swagger';
import { CreateTestQuestionDto } from './create-test.-question.dto';
import { UpdateTestAnswerDto } from '../test-answer-dto';

export class UpdateTestQuestionDto extends OmitType(CreateTestQuestionDto,["test_answers"]) {
    @ApiProperty({type:UpdateTestAnswerDto, isArray:true})
    test_answers:UpdateTestAnswerDto[]
    @ApiProperty()
    id:string
}
