import { Controller } from '@nestjs/common';
import { buildController } from '@edufin-back/common/abstract';
import { CreateCountryDto, UpdateCountryDto } from '@edufin-back/shared/dto';
import { CountryService } from './country.service';
import { CountryEntity } from '@edufin-back/shared/entities';

const BaseController = buildController({
  createDto: CreateCountryDto,
  model: CountryEntity,
  name: 'Country',
  updateDto: UpdateCountryDto,
});
@Controller('country')
export class CountryController extends BaseController {
  constructor(private readonly countryService: CountryService) {
    super(countryService);
  }
}
