import {
  CreateAcademicDegreeDto,
  GetResourceDto,
  UpdateAcademicDegreeDto,
} from '@edufin-back/shared/dto';
import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class AcademicDegreeService {
  constructor(
    @Inject('CATALOG_MICROSERVICE') private readonly catalogClient: ClientKafka
  ) {}

  findAll() {
    return this.catalogClient.send('get_catalog_academic_degree', {});
  }
  create(createAcademicDegreeDto: CreateAcademicDegreeDto) {
    return this.catalogClient.send(
      'create_catalog_academic_degree',
      JSON.stringify(createAcademicDegreeDto)
    );
  }
  update(id: string, updateAcademicDegreeDto: UpdateAcademicDegreeDto) {
    return this.catalogClient.send(
      'update_catalog_academic_degree',
      JSON.stringify({
        id,
        updateAcademicDegreeDto,
      })
    );
  }
  remove(id: string) {
    return this.catalogClient.send(
      'remove_catalog_academic_degree',
      JSON.stringify({id})
    );
  }
  getResource( page , take , include, where : GetResourceDto) {
    return this.catalogClient.send(
      'getResource_catalog_academic_degree',
      JSON.stringify({
        page,
        take,
        include,
        where,
      })
    );
  }
  findOne(id:string, include:string){
    return this.catalogClient.send('findOne_catalog_academic_degree', JSON.stringify({id,include}));
  }
}
