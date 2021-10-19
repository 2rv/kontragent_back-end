import { Repository, EntityRepository } from 'typeorm';
import { CompanyEntity } from '../company/company.entity';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { CompanyBalanceEntity } from './company-balance.entity';

@EntityRepository(CompanyBalanceEntity)
export class CompanyBalanceRepository extends Repository<CompanyBalanceEntity> {
  async createCompanyBalance(company: CompanyEntity): Promise<void> {
    const companyBalance: CompanyBalanceEntity = new CompanyBalanceEntity();

    companyBalance.company = company;

    try {
      await companyBalance.save();
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException();
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async updateCompanyBalance(
    company: CompanyEntity,
    newBalance: number,
  ): Promise<void> {
    const query = this.createQueryBuilder('companyBalance');

    query.leftJoin('companyBalance.company', 'company');

    query.where('company.id = :id', { id: company.id });

    const data = await query.getOne();

    data.amount = newBalance;

    await data.save();
  }

  async getCompanyBalanceByCompany(
    company: CompanyEntity,
  ): Promise<CompanyBalanceEntity> {
    const query = this.createQueryBuilder('companyBalance');

    query.leftJoin('companyBalance.company', 'company');

    query.where('company.id = :id', { id: company.id });

    return query.getOne();
  }
}
