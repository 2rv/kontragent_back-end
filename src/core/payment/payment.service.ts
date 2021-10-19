import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UnitpayGeneratePaymentLink } from 'src/common/utils/unitpay';
import { CompanyBalanceRepository } from '../company-balance/company-balance.repository';
import { CompanyEntity } from '../company/company.entity';
import { CompanyRepository } from '../company/company.repository';
import { GetCompanyPaymentListDto } from './dto/get-company-payment-list.dto';
import { PAYMENT_VALUTE } from './enum/payment-valute';
import { PaymentRepository } from './payment.repository';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(CompanyRepository)
    private companyRepository: CompanyRepository,
    @InjectRepository(CompanyBalanceRepository)
    private companyBalanceRepository: CompanyBalanceRepository,
    @InjectRepository(PaymentRepository)
    private paymentRepository: PaymentRepository,
  ) {}

  async getUnitpayLink(
    company: CompanyEntity,
    amount: number,
  ): Promise<string> {
    return await UnitpayGeneratePaymentLink(amount, company.id);
  }

  async getCompanyPaymentList(
    company: CompanyEntity,
  ): Promise<GetCompanyPaymentListDto> {
    const list = await this.paymentRepository.getPaymentByCompany(company);
    return { list };
  }

  async updateUnitpayPaymentInfo(queryData) {
    if (queryData.method === 'pay') {
      const company = await this.companyRepository.findOne({
        where: { id: Number(queryData.params.account) },
        relations: ['companyBalance'],
      });

      if (company) {
        if (queryData.params.orderCurrency === PAYMENT_VALUTE.RUB) {
          const newBalance =
            Number(queryData.params.orderSum) +
            Number(company.companyBalance.amount);

          await this.companyBalanceRepository.updateCompanyBalance(
            company,
            newBalance,
          );

          await this.paymentRepository.createPayment(
            company,
            Number(queryData.params.orderSum),
          );

          return {
            result: {
              message: 'Purchase pay request processed successfully',
            },
          };
        }
      } else {
        return {
          result: {
            message: 'Purchase not found',
          },
        };
      }
    } else {
      return {
        result: {
          message: 'Purchase check request processed successfully',
        },
      };
    }
  }
}
