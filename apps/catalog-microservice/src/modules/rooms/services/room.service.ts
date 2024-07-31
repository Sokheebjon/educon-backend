import {
  CreateRoomDto,
  UpdateRoomDto,
} from '@edufin-back/shared/dto';
import { BadRequestException, Injectable } from '@nestjs/common';
import { RoomRepository } from '../repository/room.repository';
import { RpcException } from '@nestjs/microservices';
import { RoomEntity } from '@edufin-back/shared/entities';

@Injectable()
export class RoomService {
  constructor(
    private readonly roomRepository: RoomRepository
  ) {}
  async findAll(): Promise<RoomEntity[] | { data: null }> {
    return await this.roomRepository.findMany();
  }
  async create(
    createRoomDto: CreateRoomDto
  ): Promise<RoomEntity> {
    try {
      return await this.roomRepository.create(
        createRoomDto
      );
    } catch (err) {
      throw new RpcException(
        new BadRequestException({
          message: err?.message,
        })
      );
    }
  }

  async findOne(id): Promise<RoomEntity> {
    return await this.roomRepository.findOne(id);
  }
  async update(
    id: string,
    updateRoomDto: UpdateRoomDto
  ): Promise<RoomEntity> {
    try {
      return await this.roomRepository.update(
        id,
        updateRoomDto
      );
    } catch (err) {
      throw new RpcException(
        new BadRequestException({
          message: err?.message,
        })
      );
    }
  }
  async remove(id: string): Promise<RoomEntity> {
    return await this.roomRepository.remove(id);
  }
  async getResource(
    page: number,
    take: number,
  ): Promise<{
    data: RoomEntity[];
    meta: { total: number; page: number; last_page: number };
  }> {
    try {
      return await this.roomRepository.getResource(
        page,
        take,
      );
    } catch (err) {
      throw new RpcException(
        new BadRequestException({
          message: err?.message,
        })
      );
    }
  }
}
