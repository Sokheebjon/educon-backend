import {
  CreateCountryDto,
  GetResourceDto,
  UpdateCountryDto,
} from '@edufin-back/shared/dto';
import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class CountryService {
  constructor(
    @Inject('CATALOG_MICROSERVICE') private readonly catalogClient: ClientKafka
  ) {}

  findAll() {
    return this.catalogClient.send('get_catalog_country', {});
  }
  create(createCountryDto: CreateCountryDto) {
    return this.catalogClient.send(
      'create_catalog_country',
      JSON.stringify(createCountryDto)
    );
  }
  update(id: string, updateCountryDto: UpdateCountryDto) {
    return this.catalogClient.send(
      'update_catalog_country',
      JSON.stringify({
        id,
        updateCountryDto,
      })
    );
  }
  remove(id: string) {
    return this.catalogClient.send(
      'remove_catalog_country',
      JSON.stringify({ id })
    );
  }
  getResource(page, take, include, where: GetResourceDto) {
    return this.catalogClient.send(
      'getResource_catalog_country',
      JSON.stringify({
        page,
        take,
        include,
        where,
      })
    );
  }
  findOne(id: string, include: string) {
    return this.catalogClient.send(
      'findOne_catalog_country',
      JSON.stringify({ id, include })
    );
  }
}
