import { Repository, EntityRepository } from 'typeorm';
import { CompanyUserEntity } from './company-user.entity';
import { CompanyEntity } from '../company/company.entity';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { UserEntity } from '../user/user.entity';
import { CompanyUserGetUserListDto } from './dto/get-company-user-list.dto';
import { COMPANY_USER_ERROR } from './enum/company-user-error.enum';
import { COMPANY_USER_ROLE } from './enum/company-user-role.enum';

@EntityRepository(CompanyUserEntity)
export class CompanyUserRepository extends Repository<CompanyUserEntity> {
  async createCompanyUser(
    company: CompanyEntity,
    userId: number,
    userCompanyRole: number,
  ): Promise<void> {
    const query = UserEntity.createQueryBuilder('user');
    query.leftJoinAndSelect('user.companyUser', 'companyUser');
    query.leftJoinAndSelect('companyUser.company', 'company');
    query.where('user.id = :id', { id: userId });
    const user = await query.getOne();
    const presentCompanyUser = !!user.companyUser.filter(
      (user) => user.company.id === company.id,
    ).length;
    if (presentCompanyUser)
      throw new ConflictException(
        COMPANY_USER_ERROR.USER_ALREADY_HAS_COMPANY_ACCOUNT,
      );

    const companyUser: CompanyUserEntity = new CompanyUserEntity();
    companyUser.company = company;
    companyUser.user = user;
    companyUser.role = userCompanyRole;

    try {
      await companyUser.save();
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException(
          COMPANY_USER_ERROR.USER_ALREADY_HAS_COMPANY_ACCOUNT,
        );
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async getCompanyUserList(company: CompanyEntity): Promise<any[]> {
    const query = this.createQueryBuilder('companyUser');
    query.leftJoinAndSelect('companyUser.user', 'user');
    query.leftJoinAndSelect('companyUser.company', 'company');
    query.where('company.id = :id', { id: company.id });
    query.select([
      'companyUser.id',
      'companyUser.position',
      'companyUser.role',
      'user.id',
      'user.login',
    ]);

    const companyUserList = await query.getRawMany();
    const companyUserGetUserListDto: CompanyUserGetUserListDto[] =
      companyUserList.map((companyUser) => {
        return {
          companyUserId: companyUser.companyUser_id,
          position: companyUser.companyUser_position,
          role: companyUser.companyUser_role,
          userId: companyUser.user_id,
          name: companyUser.user_login,
        };
      });

    return companyUserGetUserListDto;
  }
}
