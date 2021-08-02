import {
  Injectable,
  CanActivate,
  ExecutionContext,
  BadRequestException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { COMPANY_USER_ERROR } from '../enum/company-user-error.enum';
import { CompanyEntity } from '../../company/company.entity';
import { CompanyUserEntity } from '../company-user.entity';

@Injectable()
export class RequestedCompanyUserGuard implements CanActivate {
  constructor(
    @InjectRepository(CompanyUserEntity)
    private companyUserRepository: Repository<CompanyUserEntity>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { companyAccount }: { companyAccount: CompanyEntity } = request;
    const { companyUserId } = request.params;

    if (!companyAccount) throw new BadRequestException();
    if (isNaN(companyUserId)) throw new BadRequestException();

    const requestedCompanyUser = await this.companyUserRepository.findOne({
      where: { id: companyUserId, company: companyAccount },
    });

    if (!requestedCompanyUser) {
      throw new BadRequestException(
        COMPANY_USER_ERROR.USER_NOT_EMPLOYEE_OR_DONT_EXIST,
      );
    }

    request.requestedCompanyUserAccount = requestedCompanyUser;

    return true;
  }
}
