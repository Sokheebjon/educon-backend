import {
  CreateDepartmentDto,
  GetResourceDto,
  UpdateDepartmentDto,
} from '@edufin-back/shared/dto';
import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class DepartmentService {
  constructor(
    @Inject('CATALOG_MICROSERVICE') private readonly catalogClient: ClientKafka
  ) {}

  findAll() {
    return this.catalogClient.send('get_catalog_department', {});
  }
  create(createDepartmentDto: CreateDepartmentDto) {
    return this.catalogClient.send(
      'create_catalog_department',
      JSON.stringify(createDepartmentDto)
    );
  }
  update(id: string, updateDepartmentDto: UpdateDepartmentDto) {
    return this.catalogClient.send(
      'update_catalog_department',
      JSON.stringify({
        id,
        updateDepartmentDto,
      })
    );
  }
  remove(id: string) {
    return this.catalogClient.send(
      'remove_catalog_department',
      JSON.stringify({id})
    );
  }
  getResource( page , take , include, where : GetResourceDto) {
    return this.catalogClient.send(
      'getResource_catalog_department',
      JSON.stringify({
        page,
        take,
        include,
        where,
      })
    );
  }
  findOne(id:string, include:string){
    return this.catalogClient.send('findOne_catalog_department', JSON.stringify({id,include}));
  }
}
