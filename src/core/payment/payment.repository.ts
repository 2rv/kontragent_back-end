import { Repository, EntityRepository } from 'typeorm';
import { CompanyEntity } from '../company/company.entity';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { PaymentEntity } from './payment.entity';
import { PAYMENT_TYPE } from './enum/payment-type.enum';

@EntityRepository(PaymentEntity)
export class PaymentRepository extends Repository<PaymentEntity> {
  async createPayment(
    company: CompanyEntity,
    amount,
    type?: PAYMENT_TYPE,
  ): Promise<void> {
    const payment: PaymentEntity = new PaymentEntity();

    payment.company = company;
    payment.amount = amount;
    payment.type = type;

    try {
      await payment.save();
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException();
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async getPaymentByCompany(company: CompanyEntity): Promise<PaymentEntity[]> {
    const query = this.createQueryBuilder('payment');

    query.leftJoin('payment.company', 'company');

    query.where('company.id = :id', { id: company.id });

    return query.getMany();
  }
}
