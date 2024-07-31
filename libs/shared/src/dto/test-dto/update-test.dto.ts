import {  ApiProperty, PickType } from '@nestjs/swagger';
import { CreateTestDto } from './create-test.dto';
import { UpdateTestQuestionDto } from '../test-question-dto';

export class UpdateTestDto extends PickType(CreateTestDto,["subject_id","test_count"]) {
    @ApiProperty({type:UpdateTestQuestionDto, isArray:true})
    questions: UpdateTestQuestionDto[];
}
