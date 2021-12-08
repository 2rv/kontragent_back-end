import {
  ArrayMaxSize,
  IsNotEmpty,
  IsNumber,
  IsBoolean,
  IsOptional,
  IsString,
  MaxLength,
  Matches,
} from 'class-validator';

import { CreateRevisionYearDto } from '../../revision-company-year/dto/create-revision-company-year.dto';

export class CreateRevisionCompanyDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(30)
  name: string;

  @IsNotEmpty()
  @IsString()
  @Matches(/^\d{10,10}$/, { message: 'COMPANY_INN' })
  inn: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(10000)
  description: string;

  @IsOptional()
  @IsNumber({}, { each: true })
  @ArrayMaxSize(10, { message: 'MAXIMUM_OF_FILES_10' })
  fileIdList?: number[];

  year: CreateRevisionYearDto[];
}
