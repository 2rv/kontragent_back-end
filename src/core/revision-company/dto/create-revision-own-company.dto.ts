import {
  ArrayMaxSize,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

import { CreateRevisionYearDto } from '../../revision-company-year/dto/create-revision-company-year.dto';

export class CreateRevisionOwnCompanyDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(10000)
  description: string;

  @IsOptional()
  @IsNumber({}, { each: true })
  @ArrayMaxSize(10)
  fileIdList?: number[];

  year: CreateRevisionYearDto[];
}
