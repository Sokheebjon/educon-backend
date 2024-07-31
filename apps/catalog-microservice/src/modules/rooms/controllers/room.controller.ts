import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { RoomService } from '../services/room.service';
import {
  CreateRoomDto,
  GetPagenationDto,
  UpdateRoomDto,
} from '@edufin-back/shared/dto';

@Controller()
export class RoomController  {
  constructor(private readonly roomService: RoomService) {}
  @MessagePattern('get_catalog_room')
  get() {
    return this.roomService.findAll();
  }
  @MessagePattern('create_catalog_room')
  create(@Payload() createRoomDto: CreateRoomDto) {
    return this.roomService.create(createRoomDto);
  }
  @MessagePattern('update_catalog_room')
  update(
    @Payload()
    payload: {
      id: string;
      updateRoomDto: UpdateRoomDto;
    }
  ) {
    return this.roomService.update(payload?.id, payload?.updateRoomDto);
  }
  @MessagePattern('remove_catalog_room')
  remove(@Payload() payload: { id: string }) {
    return this.roomService.remove(payload?.id);
  }
  @MessagePattern('getResource_catalog_room')
  getResource(@Payload() getResourceDto: GetPagenationDto) {
    return this.roomService.getResource(
      +getResourceDto?.page,
      +getResourceDto?.take
    );
  }
  @MessagePattern('findOne_catalog_room')
  getOne(@Payload() payload: { id }) {
    return this.roomService.findOne(payload?.id);
  }
}
