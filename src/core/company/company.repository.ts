import {
  ConflictException,
  InternalServerErrorException,
  BadRequestException,
} from '@nestjs/common';
import { Repository, EntityRepository } from 'typeorm';
import { UserEntity } from '../user/user.entity';
import { CompanyEntity } from './company.entity';
import { CreateCompanyDto } from './dto/create-company.dto';
import { CreateUnregisteredCompanyDto } from './dto/create-company.dto copy';
import { COMPANY_ERROR } from './enum/company-error.enum';
import { COMPANY_TYPE } from './enum/company-type.enum';

@EntityRepository(CompanyEntity)
export class CompanyRepository extends Repository<CompanyEntity> {
  async createCompany(
    companyCreateDto: CreateCompanyDto,
    user: UserEntity,
  ): Promise<CompanyEntity> {
    const { name, inn } = companyCreateDto;

    const company: CompanyEntity = new CompanyEntity();

    company.name = name;
    company.inn = inn;
    company.user = user;
    company.registered = true;

    try {
      await company.save();
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException(COMPANY_ERROR.COMPANY_ALREADY_EXISTS);
      } else {
        throw new InternalServerErrorException();
      }
    }

    return company;
  }

  async assignUnregisteredCompany(
    companyCreateDto: CreateCompanyDto,
    user: UserEntity,
    createdUnregisteredCompany: CompanyEntity,
  ) {
    const { name } = companyCreateDto;

    createdUnregisteredCompany.name = name;
    createdUnregisteredCompany.user = user;
    createdUnregisteredCompany.registered = true;

    try {
      await createdUnregisteredCompany.save();
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException(COMPANY_ERROR.COMPANY_ALREADY_EXISTS);
      } else {
        throw new InternalServerErrorException(
          COMPANY_ERROR.COMPANY_ALREADY_EXISTS,
        );
      }
    }

    return createdUnregisteredCompany;
  }

  async createUnregisteredCompany(
    unregisteredCompanyCreateDto: CreateUnregisteredCompanyDto,
  ): Promise<CompanyEntity> {
    const { inn } = unregisteredCompanyCreateDto;
    const company: CompanyEntity = new CompanyEntity();
    company.inn = inn;

    try {
      await company.save();
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException(COMPANY_ERROR.COMPANY_ALREADY_EXISTS);
      } else {
        throw new InternalServerErrorException();
      }
    }

    return company;
  }

  async getCompanyListByUser(user: UserEntity): Promise<CompanyEntity[]> {
    const query = this.createQueryBuilder('company');

    query.leftJoin('company.companyMember', 'companyMember');
    query.leftJoin('companyMember.user', 'user');

    query.where('user.id = :id', { id: user.id });

    query.select([
      'company.id',
      'company.name',
      'company.inn',
      'companyMember.role',
    ]);

    return await query.getMany();
  }

  async getCompanyList(): Promise<CompanyEntity[]> {
    const query = this.createQueryBuilder('company');

    query.leftJoin('company.companyBalance', 'companyBalance');
    query.where('company.registered = :registered', { registered: true });

    query.select([
      'company.id',
      'company.name',
      'company.inn',
      'company.verificatePayment',
      'company.verificateInfo',
      'companyBalance.amount',
    ]);

    return await query.getMany();
  }

  async getCompanyUnregisteredList(
    type: COMPANY_TYPE,
  ): Promise<CompanyEntity[]> {
    const query = this.createQueryBuilder('company');

    query.leftJoin('company.companyBalance', 'companyBalance');

    query.select([
      'company.id',
      'company.name',
      'company.inn',
      'company.verificatePayment',
      'company.verificateInfo',
      'companyBalance.amount',
    ]);

    query.where('company.registered = false');

    if (type) {
      query.andWhere('company.type = :type', {
        type: type,
      });
    }
    return await query.getMany();
  }

  async verifyCompanyInfo(company: CompanyEntity): Promise<void> {
    try {
      this.update(company, { verificateInfo: true });
    } catch {
      throw new BadRequestException(COMPANY_ERROR.CANT_VERIFICATE_COMPANY_INFO);
    }
  }
}
