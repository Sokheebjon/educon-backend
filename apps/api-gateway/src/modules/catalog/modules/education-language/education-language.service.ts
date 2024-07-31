import {
  CreateEducationLanguageDto,
  FilterEducationLanguageDto,
  GetResourceDto,
  UpdateEducationLanguageDto,
} from '@edufin-back/shared/dto';
import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class EducationLanguageService {
  constructor(
    @Inject('CATALOG_MICROSERVICE') private readonly catalogClient: ClientKafka
  ) {}
  findAll(filter: FilterEducationLanguageDto) {
    return this.catalogClient.send('get_catalog_education_language', filter);
  }
  create(createEducationLanguageDto: CreateEducationLanguageDto) {
    return this.catalogClient.send(
      'create_catalog_education_language',
      JSON.stringify(createEducationLanguageDto)
    );
  }
  update(id: string, updateEducationLanguageDto: UpdateEducationLanguageDto) {
    return this.catalogClient.send(
      'update_catalog_education_language',
      JSON.stringify({
        id,
        updateEducationLanguageDto,
      })
    );
  }
  remove(id: string) {
    return this.catalogClient.send(
      'remove_catalog_education_language',
      JSON.stringify({ id })
    );
  }
  getResource(page, take, include, where: GetResourceDto) {
    return this.catalogClient.send(
      'getResource_catalog_education_language',
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
      'findOne_catalog_education_language',
      JSON.stringify({ id, include })
    );
  }
}
