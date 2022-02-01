import { Type } from 'class-transformer';
import {
  ArrayMaxSize,
  IsNotEmpty,
  IsNumber,
  IsBoolean,
  IsOptional,
  IsString,
  MaxLength,
  Matches,
  ValidateNested,
} from 'class-validator';

export class CreateRevisionCompanyDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(30)
  name: string;

  @IsNotEmpty()
  @IsString()
  @Matches(/^(\d{10}|\d{12})$/, { message: 'COMPANY_INN' })
  inn: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(10000)
  description: string;

  @IsOptional()
  @IsNumber({}, { each: true })
  @ArrayMaxSize(10, { message: 'MAXIMUM_OF_FILES_10' })
  fileIdList?: number[];

  @ValidateNested()
  @Type(() => CreateRevisionYearDto)
  companies: CreateRevisionYearDto[];
  year: CreateRevisionYearDto[];

  @IsString()
  createDate: string;
}
class CreateRevisionYearDto {
  @IsNotEmpty()
  year: string;

  @IsBoolean()
  firstPeriod: boolean;

  @IsBoolean()
  secondPeriod: boolean;

  @IsBoolean()
  thirdPeriod: boolean;

  @IsBoolean()
  fourthPeriod: boolean;
}
