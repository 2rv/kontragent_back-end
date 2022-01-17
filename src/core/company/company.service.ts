import {
  Injectable,
  ConflictException,
  InternalServerErrorException,
  BadRequestException,
} from '@nestjs/common';
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
import { AddCompanyAdminDto } from './dto/add-company-admin.dto';
import { COMPANY_ERROR } from './enum/company-error.enum';
import { RevisionCompanyRepository } from '../revision-company/revision-company.repository';
import { RevisionEntity } from '../revision/revision.entity';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(CompanyRepository)
    private companyRepository: CompanyRepository,
    @InjectRepository(CompanyMemberRepository)
    private companyMemberRepository: CompanyMemberRepository,
    @InjectRepository(CompanyBalanceRepository)
    private companyBalanceRepository: CompanyBalanceRepository,
    @InjectRepository(RevisionCompanyRepository)
    private revisionCompanyRepository: RevisionCompanyRepository,
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

  async addCompanyAdmin(
    addCompanyAdminDto: AddCompanyAdminDto[],
  ): Promise<void> {
    for (const i in addCompanyAdminDto) {
      if (!addCompanyAdminDto[i].inn) {
        return;
      }

      if (!addCompanyAdminDto[i].review) {
        return;
      }

      const companyByInn = await this.companyRepository.findOne({
        where: { inn: addCompanyAdminDto[i].inn },
      });

      if (!companyByInn) {
        const company: CompanyEntity = new CompanyEntity();

        company.name = addCompanyAdminDto[i].name;
        company.inn = addCompanyAdminDto[i].inn;
        if (!company.name) {
          addCompanyAdminDto[
            i
          ].name = `Компания ИНН ${addCompanyAdminDto[i].inn}`;
        }

        company.review = addCompanyAdminDto[i].review;
        company.createDate = addCompanyAdminDto[i].createDate;

        await company.save();

        await this.revisionCompanyRepository.createRevisionReview(
          company,
          addCompanyAdminDto[i].review,
          addCompanyAdminDto[i].createDate,
        );
      } else {
        companyByInn.review = addCompanyAdminDto[i].review;
        companyByInn.createDate = addCompanyAdminDto[i].createDate;

        await companyByInn.save();

        await this.revisionCompanyRepository.createRevisionReview(
          companyByInn,
          addCompanyAdminDto[i].review,
          addCompanyAdminDto[i].createDate,
        );
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

  async getAdminCompanyUnregisteredList(): Promise<CompanyEntity[]> {
    return await this.companyRepository.getCompanyUnregisteredList();
  }

  async verifyCompanyInfo(company: CompanyEntity): Promise<void> {
    await this.companyRepository.verifyCompanyInfo(company);
  }
}
