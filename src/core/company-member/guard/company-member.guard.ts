import {
  Injectable,
  CanActivate,
  ExecutionContext,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../../user/user.entity';
import { CompanyEntity } from '../../company/company.entity';
import { Reflector } from '@nestjs/core';
import { CompanyMemberEntity } from '../company-memeber.entity';
import { COMPANY_MEMBER_ERROR } from '../enum/company-member-error.enum';
import { COMPANY_MEMBER_ROLE } from '../enum/company-member-role.enum';

@Injectable()
export class CompanyMemberGuard implements CanActivate {
  constructor(
    @InjectRepository(CompanyMemberEntity)
    private companyMemberRepository: Repository<CompanyMemberEntity>,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const {
      userAccount,
      company,
    }: { userAccount: UserEntity; company: CompanyEntity } = request;

    const companyMember = await this.companyMemberRepository.findOne({
      where: {
        user: { id: userAccount.id },
        company: { id: company.id },
      },
    });

    if (!companyMember) {
      throw new ForbiddenException(COMPANY_MEMBER_ERROR.ACCESS_DENIED);
    }
    const { role = null }: { role: COMPANY_MEMBER_ROLE } = companyMember;

    if (role === null) {
      return false;
    }

    const roles: COMPANY_MEMBER_ROLE[] = this.reflector.get<
      COMPANY_MEMBER_ROLE[]
    >('companyMemberRoles', context.getHandler());

    if (roles) {
      const index = roles.indexOf(role);
      if (index === -1)
        throw new BadRequestException(COMPANY_MEMBER_ERROR.NO_ACCESS);
    }

    request.companyMember = companyMember;

    return true;
  }
}
