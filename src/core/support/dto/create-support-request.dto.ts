import { IsNotEmpty, IsString } from 'class-validator';

export class CreateSupportRequestDto {
  @IsNotEmpty()
  categoryId: number;
  @IsNotEmpty()
  @IsString()
  brief: string;
  @IsNotEmpty()
  @IsString()
  explicitly: string;
}
