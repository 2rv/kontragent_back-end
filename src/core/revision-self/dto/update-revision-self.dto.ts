import {
  ArrayMaxSize,
  IsIn,
  IsNumber,
  IsPositive,
  IsOptional,
  Length,
} from 'class-validator';

import { REVISION_SELF_STATUS } from '../enum/revision-self-status.enum';
import { REVISION_SELF_VALIDATION_ERROR } from '../enum/revision-self-validation.enum';

export class UpdateRevisionSelfDto {
  @IsOptional()
  @IsIn(Object.values(REVISION_SELF_STATUS))
  status: REVISION_SELF_STATUS;

  @IsOptional()
  @IsPositive({
    message: REVISION_SELF_VALIDATION_ERROR.ADDITIONAL_PRICE_ISNOT_NATURAL,
  })
  price?: number;

  @IsOptional()
  @Length(10, 1000000, {
    message: REVISION_SELF_VALIDATION_ERROR.REVISION_REVIEW_MIN_10,
  })
  review: string;

  @IsOptional()
  @IsNumber({}, { each: true })
  @ArrayMaxSize(10, { message: 'MAXIMUM_OF_FILES_10' })
  filesReview?: number[];
}
