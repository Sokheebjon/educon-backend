import {
  CreateExamRoomsDto,
  UpdateExamRoomsDto,
} from '@edufin-back/shared/dto';
import { BadRequestException, Injectable } from '@nestjs/common';
import { ExamRoomsRepository } from '../repository/exam-rooms.repository';
import { RpcException } from '@nestjs/microservices';
import { ExamRoomsEntity } from '@edufin-back/shared/entities';

@Injectable()
export class ExamRoomsService {
  constructor(private readonly examRoomsRepository: ExamRoomsRepository) {}
  async findAll(): Promise<ExamRoomsEntity[] | { data: null }> {
    return await this.examRoomsRepository.findMany();
  }
  async create(
    createExamRoomsDto: CreateExamRoomsDto
  ): Promise<ExamRoomsEntity> {
    try {
      return await this.examRoomsRepository.create(createExamRoomsDto);
    } catch (err) {
      throw new RpcException(
        new BadRequestException({
          message: err?.message,
        })
      );
    }
  }

  async findOne(id): Promise<ExamRoomsEntity> {
    return await this.examRoomsRepository.findOne(id);
  }
  async update(
    id: string,
    updateExamRoomsDto: UpdateExamRoomsDto
  ): Promise<ExamRoomsEntity> {
    try {
      return await this.examRoomsRepository.update(id, updateExamRoomsDto);
    } catch (err) {
      throw new RpcException(
        new BadRequestException({
          message: err?.message,
        })
      );
    }
  }
  async remove(id: string): Promise<ExamRoomsEntity> {
    return await this.examRoomsRepository.remove(id);
  }
  async getResource(
    page: number,
    take: number
  ): Promise<{
    data: ExamRoomsEntity[];
    meta: { total: number; page: number; last_page: number };
  }> {
    try {
      return await this.examRoomsRepository.getResource(page, take);
    } catch (err) {
      throw new RpcException(
        new BadRequestException({
          message: err?.message,
        })
      );
    }
  }
}
