import {
  ArrayMaxSize,
  IsIn,
  IsNumber,
  IsOptional,
  Length,
} from 'class-validator';
import { REVISION_STATUS } from '../enum/revision-status.enum';

export class UpdateRevisionDto {
  @IsOptional()
  @IsIn(Object.values(REVISION_STATUS))
  status: REVISION_STATUS;

  @IsOptional()
  @Length(10, 1000000)
  review: string;

  @IsOptional()
  @IsNumber()
  price?: number;

  @IsOptional()
  @IsNumber({}, { each: true })
  @ArrayMaxSize(10)
  fileReviewIdList?: number[];
}
