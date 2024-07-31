import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class ExamFormService {
  constructor(
    @Inject('CATALOG_MICROSERVICE') private readonly catalogClient: ClientKafka
  ) {}

  findAll() {
    return this.catalogClient.send('get_catalog_exam_form', {});
  }
  findOne(id: string) {
    return this.catalogClient.send(
      'findOne_catalog_exam_form',
      JSON.stringify({ id })
    );
  }


}
