import {
  CreateEducationDirectionDto,
  FilterEducationDirectionDto,
  UpdateEducationDirectionDto,
} from '@edufin-back/shared/dto';
import { BadRequestException, Injectable } from '@nestjs/common';
import { EducationDirectionEntity } from 'libs/shared/src/entities/education-direction.entity';
import { EducationDirectionRepository } from '../repository/education-direction.repository';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class EducationDirectionService {
  constructor(
    private readonly educationDirectionRepository: EducationDirectionRepository
  ) {}
  async findAll(filter:FilterEducationDirectionDto): Promise<EducationDirectionEntity[] | { data: null }> {
    return await this.educationDirectionRepository.findMany(filter);
  }
  async create(
    createEducationDirectionDto: CreateEducationDirectionDto
  ): Promise<EducationDirectionEntity> {
    try {
      return await this.educationDirectionRepository.create(
        createEducationDirectionDto
      );
    } catch (err) {
      throw new RpcException(
        new BadRequestException({
          message: err?.message,
        })
      );
    }
  }

  async findOne(id,education_form_id?:string): Promise<EducationDirectionEntity> {
    return await this.educationDirectionRepository.findOne(id,education_form_id);
  }
  async update(
    id: string,
    updateEducationDirectionDto: UpdateEducationDirectionDto
  ): Promise<EducationDirectionEntity> {
    try {
      return await this.educationDirectionRepository.update(
        id,
        updateEducationDirectionDto
      );
    } catch (err) {
      throw new RpcException(
        new BadRequestException({
          message: err?.message,
        })
      );
    }
  }
  async remove(id: string): Promise<EducationDirectionEntity> {
    return await this.educationDirectionRepository.remove(id);
  }
  async getResource(
    page: number,
    take: number,
  ): Promise<{
    data: EducationDirectionEntity[];
    meta: { total: number; page: number; last_page: number };
  }> {
    try {
      return await this.educationDirectionRepository.getResource(
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
