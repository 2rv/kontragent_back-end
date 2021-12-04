import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { KontragentRepository } from './kontragent.repository';
import { CreateKontragentDto } from './dto/create-kontragent.dto';
import { CompanyRepository } from '../company/company.repository';
import { KontragentEntity } from './kontragent.entity';
import { CompanyEntity } from '../company/company.entity';
import { GetKontragentInfoDto } from './dto/get-kontragent-info.dto';
import { KONTRAGENT_ERROR } from './enum/kontragent-error.enum';

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
      const findKontragent: KontragentEntity =
        await this.kontragentRepository.findOne({
          where: { contractor: findedCompany, consumer: company },
        });

      if (findKontragent) {
        throw new ConflictException(KONTRAGENT_ERROR.KONTRAGENT_ALREADY_EXISTS);
      }

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

  async getAllCompanyKontragents(
    company: CompanyEntity,
  ): Promise<KontragentEntity[]> {
    return this.kontragentRepository
      .createQueryBuilder('kontragent')
      .leftJoin('kontragent.contractor', 'contractor')
      .leftJoin('kontragent.consumer', 'consumer')
      .where('consumer.id = :id', { id: company.id })
      .select([
        'kontragent.id',
        'kontragent.createDate',
        'kontragent.name',
        'contractor.name',
        'contractor.inn',
      ])
      .getMany();
  }

  async getOneKontragent(
    kontragent: KontragentEntity,
  ): Promise<GetKontragentInfoDto> {
    return {
      id: kontragent.id,
      name: kontragent.name,
      consumer: kontragent.consumer,
      contractor: kontragent.contractor,
    };
  }

  async deleteKontragent(kontragent: KontragentEntity) {
    await this.kontragentRepository.delete(kontragent.id);
  }
}
