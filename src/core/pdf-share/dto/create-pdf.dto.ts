import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreatePdfDto {
  @IsNotEmpty()
  @IsString()
  id: 22;

  @IsNotEmpty()
  @IsString()
  createDate: string;

  @IsNotEmpty()
  @IsString()
  inn: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsNotEmpty()
  @IsString()
  email: string;
}
