import {
    ArrayMaxSize,
    IsIn,
    IsNumber,
    IsPositive,
    IsOptional,
    Length,
} from 'class-validator';
import { BILL_STATUS } from '../enum/bill-status.enum';
import {BILL_ERROR} from '../enum/bill-error.enum'

export class UpdateBillDto {

  @IsOptional()
  @IsIn(Object.values(BILL_STATUS))
  status: BILL_STATUS;


  @IsOptional()
  @Length(10, 1000000, {
    message: BILL_ERROR.BILL_DESCRIPTION_MIN_10,
  })
  description: string;

  @IsOptional()
  @IsNumber({}, { each: true })
  @ArrayMaxSize(10)
  files?: number[];

}
