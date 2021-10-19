import {
  Controller,
  Get,
  ParseIntPipe,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CompanyMemberGuard } from '../company-member/guard/company-member.guard';
import { CompanyEntity } from '../company/company.entity';
import { GetCompany } from '../company/decorator/get-company.decorator';
import { CompanyGuard } from '../company/guard/company.guard';
import { AccountGuard } from '../user/guard/account.guard';
import { GetCompanyPaymentListDto } from './dto/get-company-payment-list.dto';
import { PaymentService } from './payment.service';

@Controller('payment')
export class PaymentController {
  constructor(private paymentService: PaymentService) {}

  @Get('/untipay/company/:companyId/link')
  @UseGuards(AuthGuard(), AccountGuard, CompanyGuard)
  async GetUnitpayLink(
    @GetCompany() company: CompanyEntity,
    @Query('amount', ParseIntPipe) amount: number,
  ): Promise<{ link: string }> {
    const link = await this.paymentService.getUnitpayLink(company, amount);
    return { link };
  }

  @Get('/unitpay/update')
  updatePaymentInfo(@Query() queryData: any): Promise<any> {
    return this.paymentService.updateUnitpayPaymentInfo(queryData);
  }

  @Get('/company/:companyId')
  @UseGuards(AuthGuard(), AccountGuard, CompanyGuard, CompanyMemberGuard)
  getCompanyPaymentList(
    @GetCompany() company: CompanyEntity,
  ): Promise<GetCompanyPaymentListDto> {
    return this.paymentService.getCompanyPaymentList(company);
  }
}
