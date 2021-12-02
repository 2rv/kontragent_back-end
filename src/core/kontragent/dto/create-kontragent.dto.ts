import { IsNotEmpty, IsString } from 'class-validator';

export class CreateKontragentDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  inn: string;
}
