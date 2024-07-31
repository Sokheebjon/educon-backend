import { Controller, } from '@nestjs/common';
import { TestService } from '../services/test.service';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import {  CreateTestDto, GetResourceTestDto, GetTestsByRegistration, UpdateAnswerToTestDto, UpdateTestDto } from '@edufin-back/shared/dto';


@Controller()
export class TestController {
  constructor(
    private readonly testService: TestService) {}

  @MessagePattern("create_test")
  create(@Payload() createTestDto:CreateTestDto) {
    return this.testService.create(createTestDto);
  }

  @MessagePattern("update_test")
  update(@Payload() payload:{id:string, updateTestDto: UpdateTestDto}) {
    return this.testService.update(payload?.id, payload?.updateTestDto);
  }
  @MessagePattern("findOne_test")
  findOne(@Payload() payload:{id:string}) {
    return this.testService.findOne(payload?.id);
  }
  @MessagePattern("deleteOne_test")
  deleteOne(@Payload() payload:{id:string}) {
    return this.testService.deleteOne(payload?.id);
  }
  @MessagePattern("getResource_test")
  getResource(@Payload() {page, take}:GetResourceTestDto) {
    return this.testService.getResource({page,take});
  }
  @MessagePattern("get_tests_by_registration_id")
  getTestsBySubjectId(@Payload() payload: GetTestsByRegistration){
    return this.testService.getTestsBySubjectId(payload)
  }
  @MessagePattern("get_test_results_by_registration_id")
  getTestsResultsByRegistrationId(@Payload() payload: {registration_id:string}){
    return this.testService.calculateTestResult(payload.registration_id)
  }
  @MessagePattern("get_detailed_test_results_by_registration_id")
  getDetailedTestsResultsByRegistrationId(@Payload() payload: {registration_id:string}){
    return this.testService.calculateDetailedTestResult(payload.registration_id)
  }
  @MessagePattern("update_test_answer_by_registration_id")
  updateTestAnswer(@Payload() payload: UpdateAnswerToTestDto){
    return this.testService.updateTestAnswer(payload)
  }
  @EventPattern("delete_user_test_data_by_registration_id")
  deleteTestResults(@Payload() payload: {registration_id:string}){
     this.testService.deleteTestResults(payload.registration_id)
  }


}
