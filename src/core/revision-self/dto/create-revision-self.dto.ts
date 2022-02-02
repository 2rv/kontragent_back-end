import { Type } from 'class-transformer';
import {
  ArrayMaxSize,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  ValidateNested,
} from 'class-validator';

import { CreateRevisionSelfPeriodDto } from './revision-self-period.dto';

export class CreateRevisionSelfDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(10000)
  description: string;

  @IsOptional()
  @IsNumber({}, { each: true })
  @ArrayMaxSize(10, { message: 'MAXIMUM_OF_FILES_10' })
  files?: number[];

  @ValidateNested()
  @Type(() => CreateRevisionSelfPeriodDto)
  period: CreateRevisionSelfPeriodDto[];
}
