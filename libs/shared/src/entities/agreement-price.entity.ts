import { ApiProperty } from '@nestjs/swagger';
import { EducationDirectionEntity } from './education-direction.entity';
import { EducationFormEntity } from './education-form.entity';
import {  IsString } from 'class-validator';
import { AgreementPriceLimitsEntity } from './agreement-price-limit.entity';

export class AgreementPriceEntity {
  @ApiProperty()
  id: string;
  @ApiProperty()
  @IsString()
  education_direction_id: string;
  @ApiProperty()
  education_direction?: EducationDirectionEntity;
  @ApiProperty()
  @IsString()
  education_form_id: string;
  @ApiProperty()
  education_form?: EducationFormEntity;
  @ApiProperty()
  agreement_price_limits?: AgreementPriceLimitsEntity[];
  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  updatedAt: Date;
}
