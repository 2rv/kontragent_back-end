import {
  ArrayMaxSize,
  IsNumber,
  IsOptional,
  Length,
  IsNotEmpty,
  IsString,
} from 'class-validator';

import { FEEDBACK_ERROR } from '../enum/feedback-error.enum';

export class FeedbackCreateDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @Length(10, 1000000, {
    message: FEEDBACK_ERROR.FEEDBACK_DESCRIPTION_MIN_10,
  })
  description: string;

  @IsOptional()
  @IsNumber({}, { each: true })
  @ArrayMaxSize(10, { message: 'MAXIMUM_OF_FILES_10' })
  files?: number[];
}
