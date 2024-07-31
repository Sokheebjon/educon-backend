import {
  CreateRegistrationPurposeDto,
  GetResourceDto,
  UpdateRegistrationPurposeDto,
} from '@edufin-back/shared/dto';
import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class RegistrationPurposeService {
  constructor(
    @Inject('CATALOG_MICROSERVICE') private readonly catalogClient: ClientKafka
  ) {}

  findAll() {
    return this.catalogClient.send('get_catalog_registration_purpose', {});
  }
  create(createRegistrationPurposeDto: CreateRegistrationPurposeDto) {
    return this.catalogClient.send(
      'create_catalog_registration_purpose',
      JSON.stringify(createRegistrationPurposeDto)
    );
  }
  update(id: string, updateRegistrationPurposeDto: UpdateRegistrationPurposeDto) {
    return this.catalogClient.send(
      'update_catalog_registration_purpose',
      JSON.stringify({
        id,
        updateRegistrationPurposeDto,
      })
    );
  }
  remove(id: string) {
    return this.catalogClient.send(
      'remove_catalog_registration_purpose',
      JSON.stringify({id})
    );
  }
  getResource( page , take , include, where : GetResourceDto) {
    return this.catalogClient.send(
      'getResource_catalog_registration_purpose',
      JSON.stringify({
        page,
        take,
        include,
        where,
      })
    );
  }
  findOne(id:string, include:string){
    return this.catalogClient.send('findOne_catalog_registration_purpose', JSON.stringify({id,include}));
  }
}
