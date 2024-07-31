import {
  CreatePositionDto,
  GetResourceDto,
  UpdatePositionDto,
} from '@edufin-back/shared/dto';
import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class PositionService {
  constructor(
    @Inject('CATALOG_MICROSERVICE') private readonly catalogClient: ClientKafka
  ) {}

  findAll() {
    return this.catalogClient.send('get_catalog_position', {});
  }
  create(createPositionDto: CreatePositionDto) {
    return this.catalogClient.send(
      'create_catalog_position',
      JSON.stringify(createPositionDto)
    );
  }
  update(id: string, updatePositionDto: UpdatePositionDto) {
    return this.catalogClient.send(
      'update_catalog_position',
      JSON.stringify({
        id,
        updatePositionDto,
      })
    );
  }
  remove(id: string) {
    return this.catalogClient.send(
      'remove_catalog_position',
      JSON.stringify({id})
    );
  }
  getResource( page , take , include, where : GetResourceDto) {
    return this.catalogClient.send(
      'getResource_catalog_position',
      JSON.stringify({
        page,
        take,
        include,
        where,
      })
    );
  }
  findOne(id:string, include:string){
    return this.catalogClient.send('findOne_catalog_position', JSON.stringify({id,include}));
  }
}
