import { Controller } from '@nestjs/common';
import { buildController } from '@edufin-back/common/abstract';
import {
  CreateAgreementPriceDto,
  UpdateAgreementPriceDto,
} from '@edufin-back/shared/dto';
import { AgreementPriceService } from './agreement-price.service';
import { AgreementPriceEntity } from '@edufin-back/shared/entities';

const BaseController = buildController({
  createDto: CreateAgreementPriceDto,
  model: AgreementPriceEntity,
  name: 'Agreement Price (Shartnoma narxlari)',
  updateDto: UpdateAgreementPriceDto,
});
@Controller('agreement-price')
export class AgreementPriceController extends BaseController {
  constructor(private readonly agreementPriceService: AgreementPriceService) {
    super(agreementPriceService);
  }
}
