import {
  Controller,
  Get,
  ParseIntPipe,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CompanyGuard } from '../company/guard/company.guard';
import { AccountGuard } from '../user/guard/account.guard';
import { GetCompany } from '../company/decorator/get-company.decorator';
import { CompanyEntity } from '../company/company.entity';
import { UnitpayService } from './unitpay.service';

@Controller('pay')
export class UnitpayController {
  constructor(private unitpayService: UnitpayService) {}

  @Get('/untipay/company/:companyId/link')
  @UseGuards(AuthGuard(), AccountGuard, CompanyGuard)
  async GetUnitpayLink(
    @GetCompany() company: CompanyEntity,
    @Query('amount', ParseIntPipe) amount: number,
  ): Promise<{ link: string }> {
    const link = await this.unitpayService.getUnitpayLink(company, amount);
    return { link };
  }

  @Get('/unitpay/update')
  updatePaymentInfo(@Query() queryData: any): Promise<any> {
    return this.unitpayService.updateUnitpayPaymentInfo(queryData);
  }
}
