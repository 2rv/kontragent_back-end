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
import { ImportCompaniesDto } from './dto/import-companies.dto';
import { ReviewRepository } from '../review/review.repository';
import { COMPANY_TYPE } from './enum/company-type.enum';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(CompanyRepository)
    private companyRepository: CompanyRepository,
    @InjectRepository(CompanyMemberRepository)
    private companyMemberRepository: CompanyMemberRepository,
    @InjectRepository(CompanyBalanceRepository)
    private companyBalanceRepository: CompanyBalanceRepository,
    @InjectRepository(ReviewRepository)
    private reviewRepository: ReviewRepository,
  ) {}

  async createCompany(
    createCompanyDto: CreateCompanyDto,
    user: UserEntity,
  ): Promise<CreateCompanyInfoDto> {
    const createdUnregisteredCompany = await this.companyRepository.findOne({
      where: { inn: createCompanyDto.inn, registered: false },
    });

    if (createdUnregisteredCompany) {
      await this.companyRepository.assignUnregisteredCompany(
        createCompanyDto,
        user,
        createdUnregisteredCompany,
      );

      await this.companyMemberRepository.createCompanyMember(
        createdUnregisteredCompany,
        user,
        COMPANY_MEMBER_ROLE.OWNER,
      );

      await this.companyBalanceRepository.createCompanyBalance(
        createdUnregisteredCompany,
      );

      const createCompanyInfoDto: CreateCompanyInfoDto = {
        id: createdUnregisteredCompany.id,
      };
      return createCompanyInfoDto;
    } else {
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
  }

  async importCompanies(companiesData: ImportCompaniesDto): Promise<void> {
    const { companies } = companiesData;
    for (const item of companies) {
      const companyByInn = await this.companyRepository.findOne({
        where: { inn: item.inn },
      });

      if (!companyByInn) {
        const company = await this.companyRepository.save({
          name: item.name ? item.name : `Компания ИНН ${item.inn}`,
          inn: item.inn,
          createDate: item.createDate,
          type: companiesData.type,
        });

        await this.reviewRepository.createReview({
          company: company,
          review: item.review,
          createDate: item.createDate,
        });

        console.log(`${company.id}: ${company.name} создана`);
      } else {
        if (item.createDate) {
          companyByInn.createDate = item.createDate;
        }

        await this.reviewRepository.createReview({
          company: companyByInn,
          review: item.review,
          createDate: item.createDate,
        });

        await companyByInn.save();
      }
    }
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

  async getAdminCompanyUnregisteredList(
    type: COMPANY_TYPE,
  ): Promise<CompanyEntity[]> {
    return await this.companyRepository.getCompanyUnregisteredList(type);
  }

  async verifyCompanyInfo(company: CompanyEntity): Promise<void> {
    await this.companyRepository.verifyCompanyInfo(company);
  }
}
