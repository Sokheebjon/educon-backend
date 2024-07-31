import { CreateExamRoomsDto, UpdateExamRoomsDto } from '@edufin-back/shared/dto';
import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class ExamRoomsService {
  constructor(
    @Inject('CATALOG_MICROSERVICE') private readonly catalogClient: ClientKafka
  ) {}

  findAll() {
    return this.catalogClient.send('get_catalog_exam_rooms', {});
  }
  create(createExamRoomsDto: CreateExamRoomsDto) {
    return this.catalogClient.send(
      'create_catalog_exam_rooms',
      JSON.stringify(createExamRoomsDto)
    );
  }
  update(id: string, updateExamRoomsDto: UpdateExamRoomsDto) {
    return this.catalogClient.send(
      'update_catalog_exam_rooms',
      JSON.stringify({
        id,
        updateExamRoomsDto,
      })
    );
  }
  remove(id: string) {
    return this.catalogClient.send(
      'remove_catalog_exam_rooms',
      JSON.stringify({ id })
    );
  }
  getResource(page, take) {
    return this.catalogClient.send(
      'getResource_catalog_exam_rooms',
      JSON.stringify({
        page,
        take,
      })
    );
  }
  findOne(id: string) {
    return this.catalogClient.send(
      'findOne_catalog_exam_rooms',
      JSON.stringify({ id })
    );
  }
}
