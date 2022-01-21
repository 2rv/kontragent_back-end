import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { KontragentRepository } from './kontragent.repository';
import { CreateKontragentDto } from './dto/create-kontragent.dto';
import { CompanyRepository } from '../company/company.repository';
import { KontragentEntity } from './kontragent.entity';
import { CompanyEntity } from '../company/company.entity';
import { GetKontragentInfoDto } from './dto/get-kontragent-info.dto';
import { KONTRAGENT_ERROR } from './enum/kontragent-error.enum';
import { ImportKontragentsDto } from './dto/import-kontragents.dto';

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

  async importKontragents(
    company: CompanyEntity,
    kontragentsData: ImportKontragentsDto,
  ) {
    const { kontragents } = kontragentsData;

    for (const item of kontragents) {
      const companyByInn = await this.companyRepository.findOne({
        where: { inn: item.inn },
      });

      if (companyByInn) {
        const findKontragent: KontragentEntity =
          await this.kontragentRepository.findOne({
            where: { contractor: companyByInn, consumer: company },
          });

        if (!findKontragent) {
          await this.kontragentRepository.createKontragent(
            company,
            companyByInn,
            item.name ? item.name : `Компания ИНН ${item.inn}`,
          );
        }
      } else {
        const unregisteredCompany: CompanyEntity =
          await this.companyRepository.createUnregisteredCompany(item);

        await this.kontragentRepository.createKontragent(
          company,
          unregisteredCompany,
          item.name ? item.name : `Компания ИНН ${item.inn}`,
        );
      }
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
    return this.kontragentRepository
      .createQueryBuilder('kontragent')
      .leftJoin('kontragent.contractor', 'contractor')
      .leftJoin('kontragent.consumer', 'consumer')
      .select(['kontragent', 'contractor', 'consumer'])
      .where('kontragent.id = :id', { id: kontragent.id })
      .getOne();
  }

  async deleteKontragent(kontragent: KontragentEntity) {
    await this.kontragentRepository.delete(kontragent.id);
  }
}
