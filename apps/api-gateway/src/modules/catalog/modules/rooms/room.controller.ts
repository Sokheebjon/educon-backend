import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import {
  CreateRoomDto,
  GetPagenationDto,
  UpdateRoomDto,
} from '@edufin-back/shared/dto';
import { RoomService } from './room.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags("Rooms")
@Controller('room')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}
  @Get()
  findAll() {
    return this.roomService.findAll();
  }

  @Post()
  create(@Body() createDto: CreateRoomDto) {
    return this.roomService.create(createDto);
  }

  @Get('/get-resource')
  async getResource(
    @Query()
    { page = '0', take = '10' }: GetPagenationDto
  ) {
    return this.roomService.getResource(+page, +take);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.roomService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRoomDto: UpdateRoomDto) {
    return this.roomService.update(id, updateRoomDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.roomService.remove(id);
  }
}
