import { Repository, EntityRepository } from 'typeorm';
import { CompanyEntity } from '../company/company.entity';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { UserEntity } from '../user/user.entity';
import { CompanyMemberEntity } from './company-memeber.entity';
import { COMPANY_MEMBER_ERROR } from './enum/company-member-error.enum';

@EntityRepository(CompanyMemberEntity)
export class CompanyMemberRepository extends Repository<CompanyMemberEntity> {
  async createCompanyMember(
    company: CompanyEntity,
    user: UserEntity,
    userCompanyRole: number,
  ): Promise<void> {
    const alreadyCompanyMember = await this.createQueryBuilder('company-member')
      .leftJoin('company-member.company', 'company')
      .leftJoin('company-member.user', 'user')
      .where('company.id = :id', { id: company.id })
      .andWhere('user.id = :id', { id: user.id })
      .getOne();

    if (alreadyCompanyMember)
      throw new ConflictException(
        COMPANY_MEMBER_ERROR.USER_ALREADY_HAS_COMPANY_ACCOUNT,
      );

    const companyMember: CompanyMemberEntity = new CompanyMemberEntity();
    companyMember.company = company;
    companyMember.user = user;
    companyMember.role = userCompanyRole;

    try {
      await companyMember.save();
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException(
          COMPANY_MEMBER_ERROR.USER_ALREADY_HAS_COMPANY_ACCOUNT,
        );
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async getcompanyMemberList(
    company: CompanyEntity,
  ): Promise<CompanyMemberEntity[]> {
    const query = this.createQueryBuilder('companyMember');

    query.leftJoin('companyMember.user', 'user');
    query.leftJoin('companyMember.company', 'company');

    query.where('company.id = :id', { id: company.id });

    query.select([
      'companyMember.id',
      'companyMember.role',
      'user.id',
      'user.email',
      'user.phone',
      'user.login',
      'user.firstname',
      'user.lastname',
    ]);

    return query.getMany();
  }
}
