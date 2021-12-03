import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Repository, EntityRepository } from 'typeorm';
import { KontragentEntity } from './kontragent.entity';
import { KONTRAGENT_ERROR } from './enum/kontragent-error.enum';
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
      if (error.code === '23505') {
        throw new ConflictException(KONTRAGENT_ERROR.KONTRAGENT_ALREADY_EXISTS);
      } else {
        throw new InternalServerErrorException();
      }
    }

    return kontragent;
  }
}
