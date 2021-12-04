import {
  ArrayMaxSize,
  IsIn,
  IsNumber,
  IsPositive,
  IsOptional,
  Length,
} from 'class-validator';
import { BILL_STATUS } from '../enum/bill-status.enum';
import { BILL_ERROR } from '../enum/bill-error.enum';

export class UpdateBillDto {
  @IsOptional()
  @Length(10, 1000000, {
    message: BILL_ERROR.BILL_DESCRIPTION_MIN_10,
  })
  description: string;

  @IsNumber({}, { each: true })
  @ArrayMaxSize(10, { message: 'MAXIMUM_OF_FILES_10' }) //локалиция ошибки из enum
  files?: number[];
}
