import { Injectable } from '@nestjs/common';
import { GenderRepository } from '../repository/gender.repository';
import { GenderEntity } from '@edufin-back/shared/entities';

@Injectable()
export class GenderService {
  constructor(private readonly genderRepository: GenderRepository) {}
  async findAll(): Promise<GenderEntity[] | { data: null }> {
    return await this.genderRepository.findMany();
  }

  async findOne(id): Promise<GenderEntity> {
    return await this.genderRepository.findOne(id);
  }
}
