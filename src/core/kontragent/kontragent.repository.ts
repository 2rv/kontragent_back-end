import { InternalServerErrorException } from '@nestjs/common';
import { Repository, EntityRepository } from 'typeorm';
import { KontragentEntity } from './kontragent.entity';
import { CompanyEntity } from '../company/company.entity';

@EntityRepository(KontragentEntity)
export class KontragentRepository extends Repository<KontragentEntity> {
  async createKontragent(
    company: CompanyEntity,
    contractor: CompanyEntity,
    name: string,
  ): Promise<KontragentEntity> {
    const kontragent: KontragentEntity = new KontragentEntity();

    kontragent.consumer = company;
    kontragent.contractor = contractor;
    kontragent.name = name;

    try {
      await kontragent.save();
    } catch (error) {
      throw new InternalServerErrorException();
    }

    return kontragent;
  }
}
