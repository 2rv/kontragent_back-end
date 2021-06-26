import { Injectable, BadRequestException } from '@nestjs/common';
import { UserEntity } from '../user/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CompanyRepository } from './company.repository';
import { CompanyCreateDto } from './dto/company-create.dto';
import { CompanyEntity } from './company.entity';
import { CompanyUserRepository } from '../company-user/company-user.repository';
import { AccountGetInfoDto } from './dto/account-get-info.dto';
import { CompanyUpdateDto } from './dto/company-update.dto';
import { COMPANY_USER_ROLE } from '../company-user/enum/company-user-role.enum';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(CompanyRepository)
    private companyRepository: CompanyRepository,
    @InjectRepository(CompanyUserRepository)
    private companyUserRepository: CompanyUserRepository,
  ) {}

  async createCompany(
    companyCreateDto: CompanyCreateDto,
    user: UserEntity,
  ): Promise<void> {
    const company = await this.companyRepository.createCompany(
      companyCreateDto,
    );
    await this.companyUserRepository.createCompanyUser(
      company,
      user.id,
      COMPANY_USER_ROLE.OWNER,
    );
  }

  async getCompany(company: CompanyEntity): Promise<AccountGetInfoDto> {
    const accountGetInfoDto: AccountGetInfoDto = {
      name: company.name,
      inn: company.inn,
      verification: company.verification,
    };
    return accountGetInfoDto;
  }

  async updateCompanyInfo(
    company: CompanyEntity,
    companyUpdateDto: CompanyUpdateDto,
  ): Promise<void> {
    const { name, inn } = companyUpdateDto;
    if (name) company.name = name;
    if (inn) company.inn = inn;
    try {
      await company.save();
    } catch {
      throw new BadRequestException();
    }
  }

  async getAccountCompanyList(user: UserEntity) {
    return this.companyRepository.getCompanyList(user);
  }
}
