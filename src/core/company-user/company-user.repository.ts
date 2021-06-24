import { Repository, EntityRepository } from 'typeorm';
import { CompanyUserEntity } from './company-user.entity';
import { AUTH_ERROR } from '../auth/enum/auth-error.enum';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { CompanyEntity } from '../company/company.entity';
import { UserEntity } from '../user/user.entity';
import { CompanyUserCreateDto } from './dto/company-user-create.dto';
import { COMPANY_USER_ROLE } from './enum/company-user-role.enum';

@EntityRepository(CompanyUserEntity)
export class CompanyUserRepository extends Repository<CompanyUserEntity> {
  async createCompanyUser(
    companyEntity: CompanyEntity,
    userEntity: UserEntity,
    companyUserCreateDto?: CompanyUserCreateDto,
  ): Promise<void> {
    const companyUser: CompanyUserEntity = new CompanyUserEntity();
    const { position, role = COMPANY_USER_ROLE.MANAGER } = companyUserCreateDto;

    companyUser.company = companyEntity;
    companyUser.user = userEntity;
    if (position) companyUser.position = position;
    if (role) companyUser.role = role;

    try {
      await companyUser.save();
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException(AUTH_ERROR.USER_ALREADY_EXISTS);
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async getCompanyUserList(company: CompanyEntity, user: UserEntity) {
    console.log(company, user);
    // const { id, name } = user;
    // const { position, role, id } = company;
    // const query = this.createQueryBuilder('company_user');
  }
}
