import {  OmitType } from '@nestjs/swagger';
import { GetRegistartionListByFilterDto } from './get-list-by-filter.dto';

export class GetRegistartionExcellListByFilterDto extends OmitType(
  GetRegistartionListByFilterDto,
  ['page', 'take']
) {}
