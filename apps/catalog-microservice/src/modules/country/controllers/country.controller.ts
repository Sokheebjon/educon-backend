import { Controller } from '@nestjs/common';
import {
  Ctx,
  KafkaContext,
  MessagePattern,
  Payload,
} from '@nestjs/microservices';
import { CountryService } from '../services/country.service';
import {
  CreateCountryDto,
  GetResourceDto,
  UpdateCountryDto,
} from '@edufin-back/shared/dto';

@Controller()
export class CountryController {
  constructor(private readonly CountryService: CountryService) {}
  @MessagePattern('get_catalog_country')
  get() {
    return this.CountryService.findAll();
  }

  @MessagePattern('create_catalog_country')
  create(@Payload() createCountryDto: CreateCountryDto) {
    return this.CountryService.create(createCountryDto);
  }
  @MessagePattern('update_catalog_country')
  update(
    @Payload()
    payload: {
      id: string;
      updateCountryDto: UpdateCountryDto;
    }
  ) {
    return this.CountryService.update(payload?.id, payload?.updateCountryDto);
  }
  @MessagePattern('remove_catalog_country')
  remove(@Payload() payload: { id: string }) {
    return this.CountryService.remove(payload?.id);
  }
  @MessagePattern('getResource_catalog_country')
  getResource(@Payload() getResourceDto: GetResourceDto) {
    return this.CountryService.getResource(
      +getResourceDto?.page,
      +getResourceDto?.take,
      getResourceDto?.include,
      getResourceDto?.where
    );
  }
  @MessagePattern('findOne_catalog_country')
  async getOne(
    @Payload() payload: { id; include },
    @Ctx() context: KafkaContext
  ) {
    await context.getConsumer().commitOffsets([
      {
        topic: context.getTopic(),
        partition: context.getPartition(),
        offset: context.getMessage().offset,
      },
    ]);

    return this.CountryService.findOne(payload?.id, payload?.include);
  }
}
