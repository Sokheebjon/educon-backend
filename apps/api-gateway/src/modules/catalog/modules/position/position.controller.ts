import { Controller } from '@nestjs/common';
import { buildController } from '@edufin-back/common/abstract';
import { CreatePositionDto, UpdatePositionDto } from '@edufin-back/shared/dto';
import { PositionService } from './position.service';
import { PositionEntity } from '@edufin-back/shared/entities';

const BaseController = buildController({
  createDto: CreatePositionDto,
  model: PositionEntity,
  name: 'Position (Lavozimi (xodim yaratish oynasi uchun))',
  updateDto: UpdatePositionDto,
});
@Controller('position')
export class PositionController extends BaseController {
  constructor(private readonly positionService: PositionService) {
    super(positionService);
  }
}
