import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AgreementPriceService } from '../services/agreement-price.service';
import {
  CreateAgreementPriceDto,
  GetResourceDto,
  UpdateAgreementPriceDto,
} from '@edufin-back/shared/dto';

@Controller()
export class AgreementPriceController {
  constructor(private readonly agreementPriceService: AgreementPriceService) {}
  @MessagePattern('get_catalog_agreement_price')
  get() {
    return this.agreementPriceService.findAll();
  }

  @MessagePattern('create_catalog_agreement_price')
  create(@Payload() createAgreementPriceDto: CreateAgreementPriceDto) {
    return this.agreementPriceService.create(createAgreementPriceDto);
  }
  @MessagePattern('update_catalog_agreement_price')
  update(
    @Payload()
    payload: {
      id: string;
      updateAgreementPriceDto: UpdateAgreementPriceDto;
    }
  ) {
    return this.agreementPriceService.update(
      payload?.id,
      payload?.updateAgreementPriceDto
    );
  }
  @MessagePattern('remove_catalog_agreement_price')
  remove(@Payload() payload: { id: string }) {
    return this.agreementPriceService.remove(payload?.id);
  }
  @MessagePattern('getResource_catalog_agreement_price')
  getResource(@Payload() getResourceDto: GetResourceDto) {
    return this.agreementPriceService.getResource(
      +getResourceDto?.page,
      +getResourceDto?.take,
      getResourceDto?.include
    );
  }
  @MessagePattern('findOne_catalog_agreement_price')
  getOne(@Payload() payload: { id; include }) {
    return this.agreementPriceService.findOne(payload?.id, payload?.include);
  }
  @MessagePattern('get_one_by_score_match')
  getOneByScoreMatch(@Payload() payload: { score; education_direction_id ,education_form_id}) {
    return this.agreementPriceService.getOneByScoreMatch(payload?.score,payload?.education_direction_id,payload?.education_form_id);
  }
}
