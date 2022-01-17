import { IsNotEmpty, IsArray, Min, Max } from 'class-validator';

export class FilesUploadDto {
  @IsNotEmpty()
  @IsArray()
  @Min(1)
  @Max(6)
  fileList: [];
}
