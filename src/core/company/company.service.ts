import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CompanyBalanceRepository } from '../company-balance/company-balance.repository';
import { CompanyMemberRepository } from '../company-member/company-member.repository';
import { COMPANY_MEMBER_ROLE } from '../company-member/enum/company-member-role.enum';
import { UserEntity } from '../user/user.entity';
import { CompanyEntity } from './company.entity';
import { CompanyRepository } from './company.repository';
import { CreateCompanyDto } from './dto/create-company.dto';
import {
  GetCompanyAdminListDto,
  GetCompanyListDto,
  GetCompanyListParamsDto,
} from './dto/get-company-list.dto';
import { GetCompanyInfoDto } from './dto/get-company-info.dto';
import { CreateCompanyInfoDto } from './dto/create-company-info.dto';
import { ImportCompaniesDto } from './dto/import-companies.dto';
import { ReviewRepository } from '../review/review.repository';

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
    try {
      for (const item of companies) {
        if (!item.inn) {
          continue;
        }

        const companyByInn = await this.companyRepository.findOne({
          where: { inn: item.inn },
        });

        if (!companyByInn) {
          const company = await this.companyRepository.save({
            name: item.name ? item.name : `Компания ИНН ${item.inn}`,
            inn: item.inn,
            type: companiesData.type,
          });

          if (!item.review) {
            continue;
          }

          await this.reviewRepository.createReview({
            company: company,
            review: item.review,
            createDate: item.createDate,
            type: companiesData.type,
          });
        } else {
          if (!item.review) {
            continue;
          }

          if (item.createDate) {
            companyByInn.createDate = item.createDate;
          }

          await this.reviewRepository.createReview({
            company: companyByInn,
            review: item.review,
            createDate: item.createDate,
            type: companiesData.type,
          });

          await companyByInn.save();
        }
      }
    } catch (error) {
      throw new BadRequestException(error);
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

  async getCompanyUserList(user): Promise<GetCompanyListDto> {
    const list = await this.companyRepository.getCompanyListByUser(user);
    return { list };
  }

  async getCompanyAdminList(
    params: GetCompanyListParamsDto,
  ): Promise<GetCompanyAdminListDto> {
    const [list, count] = await this.companyRepository.getCompanyList(params);
    return {
      list: list,
      count: count,
      skip: params.skip,
      take: params.take,
      type: params.type,
    };
  }

  async verifyCompanyInfo(company: CompanyEntity): Promise<void> {
    await this.companyRepository.verifyCompanyInfo(company);
  }
}
