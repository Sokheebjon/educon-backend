import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { PositionService } from '../services/position.service';
import {
  CreatePositionDto,
  GetResourceDto,
  UpdatePositionDto,
} from '@edufin-back/shared/dto';

@Controller()
export class PositionController {
  constructor(
    private readonly positionService: PositionService
  ) {}
  @MessagePattern('get_catalog_position')
  get() {
    return this.positionService.findAll();
  }

  @MessagePattern('create_catalog_position')
  create(@Payload() createPositionDto: CreatePositionDto) {
    return this.positionService.create(createPositionDto);
  }
  @MessagePattern('update_catalog_position')
  update(
    @Payload()
    payload: {
      id: string;
      updatePositionDto: UpdatePositionDto;
    }
  ) {
    return this.positionService.update(
      payload?.id,
      payload?.updatePositionDto
    );
  }
  @MessagePattern('remove_catalog_position')
  remove(@Payload() payload: { id: string }) {
    return this.positionService.remove(payload?.id);
  }
  @MessagePattern('getResource_catalog_position')
  getResource(@Payload() getResourceDto: GetResourceDto) {
    return this.positionService.getResource(
      +getResourceDto?.page,
      +getResourceDto?.take,
      getResourceDto?.include,
      getResourceDto?.where
    );
  }
  @MessagePattern('findOne_catalog_position')
  getOne(@Payload() payload: { id; include }) {
    return this.positionService.findOne(
      payload?.id,
      payload?.include
    );
  }
}
