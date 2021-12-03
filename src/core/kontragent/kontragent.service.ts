import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../user/user.entity';
import { KontragentRepository } from './kontragent.repository';
import { CreateKontragentDto } from './dto/create-kontragent.dto';
import { KONTRAGENT_ERROR } from './enum/kontragent-error.enum';
import { CompanyRepository } from '../company/company.repository';
import { KontragentEntity } from './kontragent.entity';
import { CompanyEntity } from '../company/company.entity';
import { COMPANY_ERROR } from '../company/enum/company-error.enum';

@Injectable()
export class KontragentService {
  constructor(
    @InjectRepository(KontragentRepository)
    private kontragentRepository: KontragentRepository,
    @InjectRepository(CompanyRepository)
    private companyRepository: CompanyRepository,
  ) {}

  async createKontragent(
    createKontragentDto: CreateKontragentDto,
  ): Promise<KontragentEntity> {
    const findCompany: CompanyEntity = await this.companyRepository.findOne({
      name: createKontragentDto.name,
      inn: createKontragentDto.inn,
    });

    if (findCompany) {
      throw new ConflictException(COMPANY_ERROR.COMPANY_ALREADY_EXISTS);
    }

    const company: CompanyEntity =
      await this.companyRepository.createUnregisteredCompany(
        createKontragentDto,
      );

    const kontragent: KontragentEntity =
      await this.kontragentRepository.createKontragent(company);

    return kontragent;
  }

  async getOne(kontragentId: string): Promise<KontragentEntity> {
    return await this.kontragentRepository.findOne({
      id: Number(kontragentId),
    });
  }

  async delete(kontragentId: string) {
    await this.kontragentRepository.delete({
      id: Number(kontragentId),
    });
  }

  async getAll(): Promise<KontragentEntity[]> {
    return this.kontragentRepository.find();
  }
}
