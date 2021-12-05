import { ArrayMaxSize, IsNumber, IsOptional, Length } from 'class-validator';

import { BILL_ERROR } from '../enum/bill-error.enum';

export class UpdateBillDto {
  @IsOptional()
  @Length(10, 1000000, {
    message: BILL_ERROR.BILL_DESCRIPTION_MIN_10,
  })
  description: string;

  @IsOptional()
  @IsNumber({}, { each: true })
  @ArrayMaxSize(10, { message: 'MAXIMUM_OF_FILES_10' })
  files?: number[];
}
