import {
  AgreementPriceLimitsEntity,
  EducationDirectionEntity,
  EducationFormEntity,
  RegistrationPurposeEntity,
} from '@edufin-back/shared/entities';
import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class CatalogConnectorService {
  constructor(
    @Inject('CATALOG_MICROSERVICE') private readonly catalogClient: ClientKafka
  ) {}
  async getAllRegistrationPurpose(): Promise<RegistrationPurposeEntity[]> {
    const list = await this.catalogClient.send(
      'get_catalog_registration_purpose',
      {}
    );
    return await firstValueFrom(list);
  }
  async getSingleRegistrationPurpose(
    id: string
  ): Promise<RegistrationPurposeEntity> {
    const getOne = await this.catalogClient.send(
      'findOne_catalog_registration_purpose',
      { id }
    );
    return await firstValueFrom(getOne);
  }
  async getSingleEducationDirection(
    id: string,
    education_form_id?:string
  ): Promise<EducationDirectionEntity> {
    const getOne = await this.catalogClient.send(
      'findOne_catalog_education_direction',
      { id ,education_form_id}
    );
    return await firstValueFrom(getOne);
  }
  async getAllEducationDirection(): Promise<EducationDirectionEntity[]> {
    const getOne = await this.catalogClient.send(
      'get_catalog_education_direction',
      {}
    );
    return await firstValueFrom(getOne);
  }
  async getSingleEducationForm(id: string): Promise<EducationFormEntity> {
    const getOne = await this.catalogClient.send(
      'findOne_catalog_education_form',
      { id }
    );
    return await firstValueFrom(getOne);
  }
  async getAllEducationForm(): Promise<EducationFormEntity[]> {
    const getOne = await this.catalogClient.send(
      'get_catalog_education_form',
      {}
    );
    return await firstValueFrom(getOne);
  }
  async getSingleEducationLanguage(id: string): Promise<EducationFormEntity> {
    const getOne = await this.catalogClient.send(
      'findOne_catalog_education_language',
      { id }
    );
    return await firstValueFrom(getOne);
  }

  async getAllEducationLanguage(): Promise<EducationFormEntity[]> {
    const getOne = await this.catalogClient.send(
      'get_catalog_education_language',
      {}
    );
    return await firstValueFrom(getOne);
  }
  async getAgreementLimit(payload:{score:number,education_direction_id:string, education_form_id:string}): Promise<AgreementPriceLimitsEntity> {
    const getOne = await this.catalogClient.send(
      'get_one_by_score_match',
      payload
    );
    return await firstValueFrom(getOne);
  }
}
