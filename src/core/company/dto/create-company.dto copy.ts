import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUnregisteredCompanyDto {
  @IsNotEmpty()
  @IsString()
  inn: string;
}
