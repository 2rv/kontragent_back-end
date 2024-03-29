import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CompanyEntity } from '../company/company.entity';
import { PAYMENT_TYPE } from '../payment/enum/payment-type.enum';
import { PaymentRepository } from '../payment/payment.repository';
import { CompanyBalanceEntity } from './company-balance.entity';
import { CompanyBalanceRepository } from './company-balance.repository';
import { GetCompanyBalanceInfoDto } from './dto/get-company-balance-info.dto';
import { COMPANY_BALANCE_ERROR } from './enum/company-balance-error.enum';

@Injectable()
export class CompanyBalanceService {
  constructor(
    @InjectRepository(CompanyBalanceRepository)
    private companyBalanceRepository: CompanyBalanceRepository,
    @InjectRepository(PaymentRepository)
    private paymentRepository: PaymentRepository,
  ) {}

  async createCompanyBalancePayment(
    company: CompanyEntity,
    transactionPrice: number,
    type?: PAYMENT_TYPE,
  ) {
    const companyBalance =
      await this.companyBalanceRepository.getCompanyBalanceByCompany(company);

    const newBalance = companyBalance.amount - transactionPrice;

    if (newBalance < 0) {
      throw new BadRequestException(COMPANY_BALANCE_ERROR.NOT_ENOUGH_MONEY);
    }

    await this.companyBalanceRepository.updateCompanyBalance(
      company,
      newBalance,
    );

    await this.paymentRepository.createPayment(
      company,
      transactionPrice,
      type ? type : PAYMENT_TYPE.OUT,
    );
  }

  async createCompanyBalanceRefill(company: CompanyEntity, amount: number) {
    const companyBalance =
      await this.companyBalanceRepository.getCompanyBalanceByCompany(company);

    const newBalance = Number(companyBalance.amount) + Number(amount);

    await this.companyBalanceRepository.updateCompanyBalance(
      company,
      newBalance,
    );

    await this.paymentRepository.createPayment(
      company,
      amount,
      PAYMENT_TYPE.BILL_IN,
    );
  }

  async getCompanyBalanceInfo(
    companyBalance: CompanyBalanceEntity,
  ): Promise<GetCompanyBalanceInfoDto> {
    return {
      id: companyBalance.id,
      amount: companyBalance.amount,
    };
  }
}
