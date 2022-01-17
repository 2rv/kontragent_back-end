import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { GetCompanyPaymentListDto } from './dto/get-company-payment-list.dto';
import { PaymentRepository } from './payment.repository';
import { CompanyEntity } from '../company/company.entity';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(PaymentRepository)
    private paymentRepository: PaymentRepository,
  ) {}

  async getCompanyPaymentList(
    company: CompanyEntity,
  ): Promise<GetCompanyPaymentListDto> {
    const list = await this.paymentRepository.getPaymentByCompany(company);
    return { list };
  }
}
