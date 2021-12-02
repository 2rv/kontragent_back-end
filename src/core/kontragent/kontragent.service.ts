import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../user/user.entity';
import { KontragentRepository } from './kontragent.repository';
import { CreateKontragentDto } from './dto/create-kontragent.dto';
import { KONTRAGENT_ERROR } from './enum/kontragent-error.enum';
import { CompanyRepository } from '../company/company.repository';
import { CompanyMemberRepository } from '../company-member/company-member.repository';
import { CompanyBalanceRepository } from '../company-balance/company-balance.repository';
import { COMPANY_MEMBER_ROLE } from '../company-member/enum/company-member-role.enum';
import { KontragentEntity } from './kontragent.entity';
import { CompanyEntity } from '../company/company.entity';

@Injectable()
export class KontragentService {
  constructor(
    @InjectRepository(KontragentRepository)
    private kontragentRepository: KontragentRepository,
    @InjectRepository(CompanyRepository)
    private companyRepository: CompanyRepository,
    @InjectRepository(CompanyMemberRepository)
    private companyMemberRepository: CompanyMemberRepository,
    @InjectRepository(CompanyBalanceRepository)
    private companyBalanceRepository: CompanyBalanceRepository,
  ) {}

  async createKontragent(
    createKontragentDto: CreateKontragentDto,
    user: UserEntity,
    companyId: string,
  ): Promise<KontragentEntity> {
    const registered = true;
    const findCompany: CompanyEntity = await this.companyRepository.findOne({
      id: Number(companyId),
    });

    if (findCompany) {
      throw new ConflictException(KONTRAGENT_ERROR.KONTRAGENT_ALREADY_EXISTS);
    }

    const company: CompanyEntity = await this.companyRepository.createCompany(
      createKontragentDto,
      user,
      registered,
    );

    await this.companyMemberRepository.createCompanyMember(
      company,
      user,
      COMPANY_MEMBER_ROLE.OWNER,
    );

    await this.companyBalanceRepository.createCompanyBalance(company);

    const kontragent: KontragentEntity =
      await this.kontragentRepository.createKontragent(company);

    return kontragent;
  }

  async getOneKontragent(
    companyId: string,
    kontragentId: string,
  ): Promise<KontragentEntity> {
    const company: CompanyEntity = await this.companyRepository.findOne({
      id: Number(companyId),
    });

    if (!company) {
      throw new ConflictException(KONTRAGENT_ERROR.CANNOT_FIND_KONTRAGENT);
    }

    const kontragent: KontragentEntity =
      await this.kontragentRepository.findOne({ id: Number(kontragentId) });

    return kontragent;
  }

  async deleteKontragent(
    user: UserEntity,
    companyId: string,
    kontragentId: string,
  ) {
    const company: CompanyEntity = await this.companyRepository.findOne({
      id: Number(companyId),
    });

    if (!company) {
      throw new ConflictException(KONTRAGENT_ERROR.CANNOT_FIND_KONTRAGENT);
    }

    if (company.user !== user) {
      throw new ConflictException(KONTRAGENT_ERROR.YOU_DONT_HAVE_ACCESS);
    }

    await this.kontragentRepository.delete({ id: Number(kontragentId) });
  }

  async getAll(): Promise<KontragentEntity[]> {
    return this.kontragentRepository.find();
  }
}
