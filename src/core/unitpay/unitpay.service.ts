import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { unitpayGeneratePaymentLink } from 'src/common/utils/unitpay';
import { CompanyBalanceService } from '../company-balance/company-balance.service';
import { CompanyEntity } from '../company/company.entity';
import { CompanyRepository } from '../company/company.repository';
import { PAYMENT_VALUTE } from './enum/payment-valute';
import { PAYMENT_TYPE } from '../payment/enum/payment-type.enum';

@Injectable()
export class UnitpayService {
  constructor(
    @InjectRepository(CompanyRepository)
    private companyRepository: CompanyRepository,
    private companyBalanceService: CompanyBalanceService,
  ) {}

  async getUnitpayLink(
    company: CompanyEntity,
    amount: number,
  ): Promise<string> {
    return unitpayGeneratePaymentLink(amount, company.id);
  }

  async updateUnitpayPaymentInfo(queryData) {
    if (queryData.method === 'pay') {
      const company = await this.companyRepository.findOne({
        where: { id: Number(queryData.params.account) },
        relations: ['companyBalance'],
      });

      if (company) {
        if (queryData.params.orderCurrency === PAYMENT_VALUTE.RUB) {
          const amount = Number(queryData.params.orderSum);

          await this.companyBalanceService.createCompanyBalanceRefillPayment(
            company,
            amount,
            PAYMENT_TYPE.PAY_IN,
          );
        }
      }
    }
  }
}
