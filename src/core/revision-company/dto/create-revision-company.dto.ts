import {
  ArrayMaxSize,
  IsNotEmpty,
  IsNumber,
  IsBoolean,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateRevisionCompanyDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(30)
  name: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(30)
  inn: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(10000)
  description: string;

  @IsOptional()
  @IsNumber({}, { each: true })
  @ArrayMaxSize(10)
  fileIdList?: number[];

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
