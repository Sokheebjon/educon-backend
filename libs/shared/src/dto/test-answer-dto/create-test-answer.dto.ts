import { OmitType } from '@nestjs/swagger';
import { TestAnswersEntity } from '../../entities/test-answers.entity';

export class CreateTestAnswerDto extends OmitType(TestAnswersEntity, ['id',"question_id","question"]) {

}
