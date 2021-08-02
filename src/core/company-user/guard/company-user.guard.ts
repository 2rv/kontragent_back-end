import {
  Injectable,
  CanActivate,
  ExecutionContext,
  BadRequestException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { COMPANY_USER_ERROR } from '../enum/company-user-error.enum';
import { UserEntity } from '../../user/user.entity';
import { CompanyEntity } from '../../company/company.entity';
import { Reflector } from '@nestjs/core';
import { COMPANY_USER_ROLE } from '../enum/company-user-role.enum';
import { CompanyUserEntity } from '../company-user.entity';

@Injectable()
export class CompanyUserGuard implements CanActivate {
  constructor(
    @InjectRepository(CompanyUserEntity)
    private companyUserRepository: Repository<CompanyUserEntity>,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const {
      userAccount,
      companyAccount,
    }: { userAccount: UserEntity; companyAccount: CompanyEntity } = request;

    if (!userAccount) throw new BadRequestException();
    if (!companyAccount) throw new BadRequestException();

    const companyUser = await this.companyUserRepository.findOne({
      where: {
        user: { id: userAccount.id },
        company: { id: companyAccount.id },
      },
    });

    if (!companyUser) {
      throw new BadRequestException(COMPANY_USER_ERROR.ACCESS_DENIED);
    }
    const { role = null }: { role: COMPANY_USER_ROLE } = companyUser;

    if (role === null) {
      return false;
    }

    const roles: COMPANY_USER_ROLE[] = this.reflector.get<COMPANY_USER_ROLE[]>(
      'companyUserRoles',
      context.getHandler(),
    );

    if (roles) {
      const index = roles.indexOf(role);
      if (index === -1)
        throw new BadRequestException(COMPANY_USER_ERROR.NO_ACCESS);
    }

    return true;
  }
}
