import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class GenderService {
  constructor(
    @Inject('CATALOG_MICROSERVICE') private readonly catalogClient: ClientKafka
  ) {}

  findAll() {
    return this.catalogClient.send('get_catalog_gender', {});
  }
  findOne(id: string) {
    return this.catalogClient.send(
      'findOne_catalog_gender',
      JSON.stringify({ id })
    );
  }


}
