import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class CatalogConnectorService {
  constructor(
    @Inject('CATALOG_MICROSERVICE') private readonly catalogClient: ClientKafka
  ) {}

  async getOne({ id }: { id: string }) {
    const response$ = this.catalogClient.send(
      'findOne_catalog_academic_subject',
      { id }
    );

    const response = await firstValueFrom(response$);
    return response;
  }
}
