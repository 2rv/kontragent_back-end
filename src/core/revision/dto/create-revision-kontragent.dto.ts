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
import { CreateRevisionKontragentPeriodDto } from 'src/core/revision-kontragent/dto/revision-kontragent-period.dto';

class RevisionKontragentDto {
  @IsNotEmpty()
  @IsNumber()
  kontragentId: number;

  @IsNotEmpty()
  @IsString()
  @MaxLength(10000)
  description: string;

  @IsOptional()
  @IsNumber({}, { each: true })
  @ArrayMaxSize(10, { message: 'MAXIMUM_OF_FILES_10' })
  fileIdList?: number[];

  @ValidateNested()
  @Type(() => CreateRevisionKontragentPeriodDto)
  years: CreateRevisionKontragentPeriodDto[];
}

export class CreateRevisionKontragentDto {
  @ValidateNested()
  @Type(() => RevisionKontragentDto)
  kontragents: RevisionKontragentDto[];
}
