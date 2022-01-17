import { Controller, Get, UseGuards } from '@nestjs/common';
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

  @Get('/company/:companyId')
  @UseGuards(AuthGuard(), AccountGuard, CompanyGuard, CompanyMemberGuard)
  getCompanyPaymentList(
    @GetCompany() company: CompanyEntity,
  ): Promise<GetCompanyPaymentListDto> {
    return this.paymentService.getCompanyPaymentList(company);
  }
}
