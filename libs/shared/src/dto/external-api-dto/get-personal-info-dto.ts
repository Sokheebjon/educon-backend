import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsInt,
  IsDateString,
  Length,
  MaxLength,
  IsIn,
} from 'class-validator';

export class GetPersonalInfoExternalDto {
  @ApiProperty({
    required:true,
    description:
      'PINFL (Personal Identification Number for Individuals). Must be exactly 14 characters long.',
  })
  @IsString()
  @Length(14, 14, { message: 'PINFL must be exactly 14 characters long' })
  sender_pinfl: string;

  @ApiProperty({
    description:
      'Unique transaction identifier. Defaults to 3 if not provided.',
    default: 3,
  })
  @IsInt()

  transaction_id: number = 3; 

  @ApiProperty({
    required:true,
    description:
      'Indicates consent status. Should be "Y" for Yes or "N" for No.',
  })
  @IsString()
  @IsIn(['Y', 'N'], { message: 'is_consent must be either "Y" or "N"' })
  is_consent: string;

  @ApiProperty({
    description:
      'Language of the returned data. 1 for Russian, 2 for Uzbek Cyrillic, 3 for Uzbek Latin.',
    example: 1,
  })
  @IsInt()
  @IsIn([1, 2, 3], {
    message:
      'langId must be 1 (Russian), 2 (Uzbek Cyrillic), or 3 (Uzbek Latin)',
  })
  langId: number;

  @ApiProperty({
    description:
      'Document number associated with the transaction. Maximum length is 20 characters.',
  })
  @IsString()
  @MaxLength(20, { message: 'Document should not exceed 20 characters' })
  document: string;

  @ApiProperty({
    required:true,
    description: 'Birth date of the individual in YYYY-MM-DD format.',
  })
  @IsDateString({ strict: true })
  birth_date: string;

  @ApiProperty({
    description:
      'Indicates if a photo is included. Should be "Y" for Yes or "N" for No.',
  })
  @IsString()
  @IsIn(['Y', 'N'], { message: 'is_photo must be either "Y" or "N"' })
  is_photo: string;

  @ApiProperty({
    required:true,
    description:
      'Sender type. Should be "P" for Personal or "C" for Corporate.',
  })
  @IsString()
  @IsIn(['P', 'C'], { message: 'Sender must be either "P" or "C"' })
  Sender: string;
}
