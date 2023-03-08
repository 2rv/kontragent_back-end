import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  ValidateNested,
} from 'class-validator';

export class ImportKontragentsDto {
  @ValidateNested()
  @Type(() => KontragentDto)
  kontragents: KontragentDto[];
}
class KontragentDto {
  @IsNotEmpty()
  @IsString()
  @Matches(/^(\d{10}|\d{12})$/, { message: 'COMPANY_INN' })
  inn: string;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  createDate?: string;
}
