import {
  Injectable,
  MethodNotAllowedException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CompanyEntity } from '../company/company.entity';
import { USER_ROLE } from '../user/enum/user-role.enum';
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
    const companyMember = await this.companyMemberRepository
      .createQueryBuilder('company-member')
      .leftJoin('company-member.company', 'company')
      .leftJoin('company-member.user', 'user')
      .where('company.id = :companyId', { companyId: company.id })
      .andWhere('user.id = :userId', { userId: user.id })
      .getOne();

    if (companyMember) {
      throw new BadRequestException(
        COMPANY_MEMBER_ERROR.USER_ALREADY_HAS_COMPANY_ACCOUNT,
      );
    }

    if(user.role === USER_ROLE.ADMIN)
    {
      throw new BadRequestException(
        COMPANY_MEMBER_ERROR.CANNOT_ADD_SUCH_A_USER,
      );
    }

    await this.companyMemberRepository.createCompanyMember(company, user, role);
  }

  async deleteCompanyMember(companyMember: CompanyMemberEntity): Promise<void> {
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
