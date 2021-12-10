import {
  Injectable,
  MethodNotAllowedException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CompanyEntity } from '../company/company.entity';
import { USER_ROLE } from '../user/enum/user-role.enum';
import { USER_ERROR } from '../user/enum/user-error.enum';
import { CompanyMemberRepository } from './company-member.repository';
import { UserRepository } from '../user/user.repository';
import { CompanyMemberEntity } from './company-memeber.entity';
import { GetCompanyMemberListDto } from './dto/get-company-user-list.dto';
import { GetAdminCompanyMemberListDto } from './dto/get-admin-company-user-list.dto';
import { COMPANY_MEMBER_ERROR } from './enum/company-member-error.enum';
import { COMPANY_MEMBER_ROLE } from './enum/company-member-role.enum';

@Injectable()
export class CompanyMemberService {
  constructor(
    @InjectRepository(CompanyMemberRepository)
    private companyMemberRepository: CompanyMemberRepository,
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {}

  async createCompanyMember(
    company: CompanyEntity,
    credential: string,
    role: COMPANY_MEMBER_ROLE,
  ): Promise<void> {
    const user = await this.userRepository.findOne({
      where: [{ login: credential }, { email: credential }],
    });

    if (!user) {
      throw new BadRequestException(USER_ERROR.CANNOT_FIND_USER);
    }
    if (String(user.role) === String(USER_ROLE.BLOCKED)) {
      throw new BadRequestException(USER_ERROR.USER_IS_BLOKED);
    }
    if (user.role === USER_ROLE.ADMIN) {
      throw new BadRequestException(
        COMPANY_MEMBER_ERROR.CANNOT_ADD_SUCH_A_USER,
      );
    }
    if (!user.confirmEmail && !user.confirmPhone) {
      throw new BadRequestException(USER_ERROR.USER_NOT_VERIFIED);
    }

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
    companyMember: CompanyMemberEntity,
  ): Promise<GetCompanyMemberListDto> {
    const list = await this.companyMemberRepository.getcompanyMemberList(
      company,
    );

    return { list, companyMemberRole: companyMember.role };
  }

  async getAdminCompanyMemberList(
    company: CompanyEntity,
  ): Promise<GetAdminCompanyMemberListDto> {
    const list = await this.companyMemberRepository.getAdminCompanyMemberList(
      company,
    );

    return { list };
  }
}
