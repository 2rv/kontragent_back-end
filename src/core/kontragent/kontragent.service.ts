import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { KontragentRepository } from './kontragent.repository';
import { CreateKontragentDto } from './dto/create-kontragent.dto';
import { CompanyRepository } from '../company/company.repository';
import { KontragentEntity } from './kontragent.entity';
import { CompanyEntity } from '../company/company.entity';

@Injectable()
export class KontragentService {
  constructor(
    @InjectRepository(KontragentRepository)
    private kontragentRepository: KontragentRepository,
    @InjectRepository(CompanyRepository)
    private companyRepository: CompanyRepository,
  ) {}

  async createKontragent(
    company: CompanyEntity,
    createKontragentDto: CreateKontragentDto,
  ): Promise<KontragentEntity> {
    const findedCompany: CompanyEntity = await this.companyRepository.findOne({
      inn: createKontragentDto.inn,
    });

    if (findedCompany) {
      return await this.kontragentRepository.createKontragent(
        company,
        findedCompany,
        createKontragentDto.name,
      );
    } else {
      const unregisteredCompany: CompanyEntity =
        await this.companyRepository.createUnregisteredCompany(
          createKontragentDto,
        );

      return await this.kontragentRepository.createKontragent(
        company,
        unregisteredCompany,
        createKontragentDto.name,
      );
    }
  }

  async getAllCompanyKontragents(): Promise<KontragentEntity[]> {
    return this.kontragentRepository.find();
  }

  async getOneKontragent(
    kontragent: KontragentEntity,
  ): Promise<KontragentEntity> {
    return await this.kontragentRepository.findOne({ consumer: kontragent });
  }

  async deleteKontragent(kontragent: KontragentEntity) {
    await this.kontragentRepository.delete({ consumer: kontragent });
  }
}
