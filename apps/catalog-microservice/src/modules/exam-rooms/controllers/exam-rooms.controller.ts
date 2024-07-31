import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import {
  CreateExamRoomsDto,
  GetPagenationDto,
  UpdateExamRoomsDto,
} from '@edufin-back/shared/dto';
import { ExamRoomsService } from '../services/exam-rooms.service';

@Controller()
export class ExamRoomsController {
  constructor(private readonly examRoomsService: ExamRoomsService) {}
  @MessagePattern('get_catalog_exam_rooms')
  get() {
    return this.examRoomsService.findAll();
  }
  @MessagePattern('create_catalog_exam_rooms')
  create(@Payload() createExamRoomsDto: CreateExamRoomsDto) {
    return this.examRoomsService.create(createExamRoomsDto);
  }
  @MessagePattern('update_catalog_exam_rooms')
  update(
    @Payload()
    payload: {
      id: string;
      updateExamRoomsDto: UpdateExamRoomsDto;
    }
  ) {
    return this.examRoomsService.update(
      payload?.id,
      payload?.updateExamRoomsDto
    );
  }
  @MessagePattern('remove_catalog_exam_rooms')
  remove(@Payload() payload: { id: string }) {
    return this.examRoomsService.remove(payload?.id);
  }
  @MessagePattern('getResource_catalog_exam_rooms')
  getResource(@Payload() getResourceDto: GetPagenationDto) {
    return this.examRoomsService.getResource(
      +getResourceDto?.page,
      +getResourceDto?.take
    );
  }
  @MessagePattern('findOne_catalog_exam_rooms')
  getOne(@Payload() payload: { id }) {
    return this.examRoomsService.findOne(payload?.id);
  }
}
