import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsObject,
  IsNumber,
} from 'class-validator';

export class CreatePostDto {
  @IsOptional()
  @IsNumber()
  imageId?: number;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsObject()
  article: {
    blocks: [];
    time: number;
    version: string;
  };
}
