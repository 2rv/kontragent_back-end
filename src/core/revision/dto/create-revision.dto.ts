import {
  ArrayMaxSize,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateRevisionDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(30)
  title: string;

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
  year: { name: string; period: boolean[] }[];
}
