import { Repository, EntityRepository } from 'typeorm';
import { AUTH_ERROR } from '../auth/enum/auth-error.enum';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { CompanyEntity } from './company.entity';
import { CompanyCreateDto } from './dto/company-create.dto';
import { UserEntity } from '../user/user.entity';

@EntityRepository(CompanyEntity)
export class CompanyRepository extends Repository<CompanyEntity> {
  async createCompany(
    companyCreateDto: CompanyCreateDto,
  ): Promise<CompanyEntity> {
    const { name, inn } = companyCreateDto;
    const company: CompanyEntity = new CompanyEntity();
    company.name = name;
    company.inn = inn;
    try {
      await company.save();
      return company;
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException(AUTH_ERROR.COMPANY_ALREADY_EXISTS);
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
