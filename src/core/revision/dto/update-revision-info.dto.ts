import {
  ArrayMaxSize,
  IsIn,
  IsNumber,
  IsPositive,
  IsOptional,
  Length,
} from 'class-validator';
import { REVISION_STATUS } from '../enum/revision-status.enum';
import { REVISION_VALIDATION_ERROR } from '../enum/revision-validation.enum';

export class UpdateRevisionDto {
  @IsOptional()
  @IsIn(Object.values(REVISION_STATUS))
  status: REVISION_STATUS;

  @IsOptional()
  @Length(10, 1000000, {
    message: REVISION_VALIDATION_ERROR.REVISION_REVIEW_MIN_10,
  })
  review: string;

  @IsOptional()
  @IsPositive({
    message: REVISION_VALIDATION_ERROR.ADDITIONAL_PRICE_ISNOT_NATURAL,
  })
  additionPrice?: number;

  @IsOptional()
  @IsNumber({}, { each: true })
  @ArrayMaxSize(10)
  fileReviewIdList?: number[];
}
