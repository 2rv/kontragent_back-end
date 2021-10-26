import {
  Injectable,
  CanActivate,
  ExecutionContext,
  BadRequestException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CompanyEntity } from '../../company/company.entity';
import { Reflector } from '@nestjs/core';
import { CompanyMemberEntity } from '../company-memeber.entity';
import { COMPANY_MEMBER_ERROR } from '../enum/company-member-error.enum';

@Injectable()
export class CompanyMemberParametrGuard implements CanActivate {
  constructor(
    @InjectRepository(CompanyMemberEntity)
    private companyMemberRepository: Repository<CompanyMemberEntity>,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { company }: { company: CompanyEntity } = request;
    const { params } = request;

    if (isNaN(params.companyMemberId)) {
      throw new BadRequestException();
    }
    if (!company) throw new BadRequestException();

    const companyMember = await this.companyMemberRepository.findOne({
      where: {
        id: params.companyMemberId,
        company: { id: company.id },
      },
    });

    if (!companyMember) {
      throw new BadRequestException(
        COMPANY_MEMBER_ERROR.COMPANY_MEMBER_WITH_THIS_ID_NOT_EXISTS,
      );
    }

    request.paramCompanyMember = companyMember;

    return true;
  }
}
