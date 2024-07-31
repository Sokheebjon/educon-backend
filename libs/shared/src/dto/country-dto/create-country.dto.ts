import { OmitType } from '@nestjs/swagger';
import { CountryEntity } from '../../entities/country.entity';

export class CreateCountryDto extends OmitType(CountryEntity, [
  'id',
  'createdAt',
  'updatedAt',
]) {}
