import { CreateRoomDto, UpdateRoomDto } from '@edufin-back/shared/dto';
import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class RoomService {
  constructor(
    @Inject('CATALOG_MICROSERVICE') private readonly catalogClient: ClientKafka
  ) {}

  findAll() {
    return this.catalogClient.send('get_catalog_room', {});
  }
  create(createRoomDto: CreateRoomDto) {
    return this.catalogClient.send(
      'create_catalog_room',
      JSON.stringify(createRoomDto)
    );
  }
  update(id: string, updateRoomDto: UpdateRoomDto) {
    return this.catalogClient.send(
      'update_catalog_room',
      JSON.stringify({
        id,
        updateRoomDto,
      })
    );
  }
  remove(id: string) {
    return this.catalogClient.send(
      'remove_catalog_room',
      JSON.stringify({ id })
    );
  }
  getResource(page, take) {
    return this.catalogClient.send(
      'getResource_catalog_room',
      JSON.stringify({
        page,
        take,
      })
    );
  }
  findOne(id: string) {
    return this.catalogClient.send(
      'findOne_catalog_room',
      JSON.stringify({ id })
    );
  }
}
