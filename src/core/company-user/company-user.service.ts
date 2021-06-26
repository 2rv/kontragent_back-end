import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CompanyEntity } from '../company/company.entity';
import { CompanyUserRepository } from '../company-user/company-user.repository';
import { CompanyUserGetUserListDto } from './dto/get-company-user-list.dto';
import { CompanyUserCreateDto } from './dto/company-user-create.dto';
import { CompanyUserEntity } from './company-user.entity';
import { UpdateCompanyUserDto } from './dto/update-company-user.dto';

@Injectable()
export class CompanyUserService {
  constructor(
    @InjectRepository(CompanyUserRepository)
    private companyUserRepository: CompanyUserRepository,
  ) {}
  async getCompanyUserList(
    company: CompanyEntity,
  ): Promise<CompanyUserGetUserListDto[]> {
    return this.companyUserRepository.getCompanyUserList(company);
  }

  async addCompanyUser(
    company: CompanyEntity,
    companyUserCreateDto: CompanyUserCreateDto,
  ): Promise<void> {
    await this.companyUserRepository.createCompanyUser(
      company,
      companyUserCreateDto.userId,
      companyUserCreateDto.role,
    );
  }

  async deleteCompanyUser(companyUser: CompanyUserEntity): Promise<void> {
    await this.companyUserRepository.remove(companyUser);
  }

  async updateCompanyUser(
    companyUser: CompanyUserEntity,
    updateCompanyUserDto: UpdateCompanyUserDto,
  ): Promise<void> {
    const { position, role } = updateCompanyUserDto;
    await this.companyUserRepository.update(companyUser.id, {
      position: position,
      role: role,
    });
  }
}
