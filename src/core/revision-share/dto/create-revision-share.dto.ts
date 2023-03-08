import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePdfDto {
  @IsNotEmpty()
  @IsString()
  email: string;
}
