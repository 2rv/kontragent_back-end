import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsObject,
  IsNumber,
} from 'class-validator';

export class UpdatePostDto {
  @IsOptional()
  @IsNumber()
  imageId?: number;

  @IsOptional()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsObject()
  article: {
    blocks: [];
    time: number;
    version: string;
  };
}
