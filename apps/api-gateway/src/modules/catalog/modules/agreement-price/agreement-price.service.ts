import {
  CreateAgreementPriceDto,
  GetResourceDto,
  UpdateAgreementPriceDto,
} from '@edufin-back/shared/dto';
import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class AgreementPriceService {
  constructor(
    @Inject('CATALOG_MICROSERVICE') private readonly catalogClient: ClientKafka
  ) {}

  findAll() {
    return this.catalogClient.send('get_catalog_agreement_price', {});
  }
  create(createAgreementPriceDto: CreateAgreementPriceDto) {
    return this.catalogClient.send(
      'create_catalog_agreement_price',
      JSON.stringify(createAgreementPriceDto)
    );
  }
  update(id: string, updateAgreementPriceDto: UpdateAgreementPriceDto) {
    return this.catalogClient.send(
      'update_catalog_agreement_price',
      JSON.stringify({
        id,
        updateAgreementPriceDto,
      })
    );
  }
  remove(id: string) {
    return this.catalogClient.send(
      'remove_catalog_agreement_price',
      JSON.stringify({ id })
    );
  }
  getResource(page, take, include, where: GetResourceDto) {
    return this.catalogClient.send(
      'getResource_catalog_agreement_price',
      JSON.stringify({
        page,
        take,
        include,
        where,
      })
    );
  }
  findOne(id: string, include: string) {
    return this.catalogClient.send(
      'findOne_catalog_agreement_price',
      JSON.stringify({ id, include })
    );
  }
}
