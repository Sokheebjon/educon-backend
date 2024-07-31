import {
  CreateAcademicSubjectDto,
  GetResourceDto,
  UpdateAcademicSubjectDto,
} from '@edufin-back/shared/dto';
import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class AcademicSubjectService {
  constructor(
    @Inject('CATALOG_MICROSERVICE') private readonly catalogClient: ClientKafka
  ) {}

  findAll() {
    return this.catalogClient.send('get_catalog_academic_subject', {});
  }
  create(createAcademicSubjectDto: CreateAcademicSubjectDto) {
    return this.catalogClient.send(
      'create_catalog_academic_subject',
      JSON.stringify(createAcademicSubjectDto)
    );
  }
  update(id: string, updateAcademicSubjectDto: UpdateAcademicSubjectDto) {
    return this.catalogClient.send(
      'update_catalog_academic_subject',
      JSON.stringify({
        id,
        updateAcademicSubjectDto,
      })
    );
  }
  remove(id: string) {
    return this.catalogClient.send(
      'remove_catalog_academic_subject',
      JSON.stringify({id})
    );
  }
  getResource( page , take , include, where : GetResourceDto) {
    return this.catalogClient.send(
      'getResource_catalog_academic_subject',
      JSON.stringify({
        page,
        take,
        include,
        where,
      })
    );
  }
  findOne(id:string, include:string){
    return this.catalogClient.send('findOne_catalog_academic_subject', JSON.stringify({id,include}));
  }
}
