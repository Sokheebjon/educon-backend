import {
  CreateEducationDirectionDto,
  FilterEducationDirectionDto,
  GetResourceDto,
  UpdateEducationDirectionDto,
} from '@edufin-back/shared/dto';
import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class EducationDirectionService {
  constructor(
    @Inject('CATALOG_MICROSERVICE') private readonly catalogClient: ClientKafka
  ) {}

  findAll(filter: FilterEducationDirectionDto) {
    return this.catalogClient.send('get_catalog_education_direction', filter);
  }
  create(createEducationDirectionDto: CreateEducationDirectionDto) {
    return this.catalogClient.send(
      'create_catalog_education_direction',
      JSON.stringify(createEducationDirectionDto)
    );
  }
  update(id: string, updateEducationDirectionDto: UpdateEducationDirectionDto) {
    return this.catalogClient.send(
      'update_catalog_education_direction',
      JSON.stringify({
        id,
        updateEducationDirectionDto,
      })
    );
  }
  remove(id: string) {
    return this.catalogClient.send(
      'remove_catalog_education_direction',
      JSON.stringify({ id })
    );
  }
  getResource(page, take, include, where: GetResourceDto) {
    return this.catalogClient.send(
      'getResource_catalog_education_direction',
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
      'findOne_catalog_education_direction',
      JSON.stringify({ id, include })
    );
  }
}
