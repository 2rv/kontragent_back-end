import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CompanyEntity } from '../company/company.entity';
import { CompanyUserRepository } from '../company-user/company-user.repository';
import { UserEntity } from '../user/user.entity';

@Injectable()
export class CompanyUserService {
  constructor(
    @InjectRepository(CompanyUserRepository)
    private companyUserRepository: CompanyUserRepository,
  ) {}

  async getCompanyUserList(
    company: CompanyEntity,
    user: UserEntity,
  ): Promise<void> {
    this.companyUserRepository.getCompanyUserList(company, user);
  }
}
