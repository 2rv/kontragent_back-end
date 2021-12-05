import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CompanyBalanceRepository } from '../company-balance/company-balance.repository';
import { CompanyMemberRepository } from '../company-member/company-member.repository';
import { COMPANY_MEMBER_ROLE } from '../company-member/enum/company-member-role.enum';
import { UserEntity } from '../user/user.entity';
import { CompanyEntity } from './company.entity';
import { CompanyRepository } from './company.repository';
import { CreateCompanyDto } from './dto/create-company.dto';
import { GetAccountCompanyListDto } from './dto/get-account-company-list.dto';
import { GetAdminCompanyListDto } from './dto/get-admin-company-list.dto';
import { GetCompanyInfoDto } from './dto/get-company-info.dto';
import { CreateCompanyInfoDto } from './dto/create-company-info.dto';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(CompanyRepository)
    private companyRepository: CompanyRepository,
    @InjectRepository(CompanyMemberRepository)
    private companyMemberRepository: CompanyMemberRepository,
    @InjectRepository(CompanyBalanceRepository)
    private companyBalanceRepository: CompanyBalanceRepository,
  ) {}

  async createCompany(
    createCompanyDto: CreateCompanyDto,
    user: UserEntity,
  ): Promise<CreateCompanyInfoDto> {
    const company = await this.companyRepository.createCompany(
      createCompanyDto,
      user,
    );

    await this.companyMemberRepository.createCompanyMember(
      company,
      user,
      COMPANY_MEMBER_ROLE.OWNER,
    );

    await this.companyBalanceRepository.createCompanyBalance(company);

    const createCompanyInfoDto: CreateCompanyInfoDto = { id: company.id };
    return createCompanyInfoDto;
  }

  async getCompanyInfo(company: CompanyEntity): Promise<GetCompanyInfoDto> {
    return {
      id: company.id,
      name: company.name,
      inn: company.inn,
      verificatePayment: company.verificatePayment,
      verificateInfo: company.verificateInfo,
    };
  }

  async getAccountCompanyList(user): Promise<GetAccountCompanyListDto> {
    const list = await this.companyRepository.getCompanyListByUser(user);
    return { list };
  }

  async getAdminCompanyList(): Promise<GetAdminCompanyListDto> {
    const list = await this.companyRepository.getCompanyList();
    return { list };
  }

  async getAdminCompanyUnregisteredList(): Promise<CompanyEntity[]> {
    return await this.companyRepository.getCompanyUnregisteredList();
  }

  async verifyCompanyInfo(company: CompanyEntity): Promise<void> {
    await this.companyRepository.verifyCompanyInfo(company);
  }
}
