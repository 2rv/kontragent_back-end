import { Injectable, MethodNotAllowedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CompanyEntity } from '../company/company.entity';
import { UserEntity } from '../user/user.entity';
import { CompanyMemberRepository } from './company-member.repository';
import { CompanyMemberEntity } from './company-memeber.entity';
import { GetcompanyMemberListDto } from './dto/get-company-user-list.dto';
import { COMPANY_MEMBER_ERROR } from './enum/company-member-error.enum';
import { COMPANY_MEMBER_ROLE } from './enum/company-member-role.enum';

@Injectable()
export class CompanyMemberService {
  constructor(
    @InjectRepository(CompanyMemberRepository)
    private companyMemberRepository: CompanyMemberRepository,
  ) {}

  async createCompanyMember(
    company: CompanyEntity,
    user: UserEntity,
    role: COMPANY_MEMBER_ROLE,
  ): Promise<void> {
    await this.companyMemberRepository.createCompanyMember(company, user, role);
  }

  async deletecompanyMember(companyMember: CompanyMemberEntity): Promise<void> {
    if (companyMember.role === COMPANY_MEMBER_ROLE.OWNER) {
      throw new MethodNotAllowedException(
        COMPANY_MEMBER_ERROR.CANNOT_REMOVE_COMPANY_MEMBER_OWNER,
      );
    }
    await this.companyMemberRepository.remove(companyMember);
  }

  async getcompanyMemberList(
    company: CompanyEntity,
  ): Promise<GetcompanyMemberListDto> {
    const list = await this.companyMemberRepository.getcompanyMemberList(
      company,
    );

    return { list };
  }
}
