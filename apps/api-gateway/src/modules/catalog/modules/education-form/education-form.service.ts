import {
  CreateEducationFormDto,
  FilterEducationFormDto,
  GetResourceDto,
  UpdateEducationFormDto,
} from '@edufin-back/shared/dto';
import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class EducationFormService {
  constructor(
    @Inject('CATALOG_MICROSERVICE') private readonly catalogClient: ClientKafka
  ) {}

  findAll(filter: FilterEducationFormDto) {
    return this.catalogClient.send('get_catalog_education_form', filter);
  }
  create(createEducationFormDto: CreateEducationFormDto) {
    return this.catalogClient.send(
      'create_catalog_education_form',
      JSON.stringify(createEducationFormDto)
    );
  }
  update(id: string, updateEducationFormDto: UpdateEducationFormDto) {
    return this.catalogClient.send(
      'update_catalog_education_form',
      JSON.stringify({
        id,
        updateEducationFormDto,
      })
    );
  }
  remove(id: string) {
    return this.catalogClient.send(
      'remove_catalog_education_form',
      JSON.stringify({ id })
    );
  }
  getResource(page, take, include, where: GetResourceDto) {
    return this.catalogClient.send(
      'getResource_catalog_education_form',
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
      'findOne_catalog_education_form',
      JSON.stringify({ id, include })
    );
  }
}
