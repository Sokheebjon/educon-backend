import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class AnswerToTestDto  {
    @ApiProperty()
    @IsString()
    question_id :string
    @ApiProperty()
    @IsString()
    answer_id :string
  }
  