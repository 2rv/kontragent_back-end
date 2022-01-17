import { Repository, EntityRepository } from 'typeorm';
import { CompanyDataEntity } from './company-data.entity';

@EntityRepository(CompanyDataEntity)
export class CompanyDataRepository extends Repository<CompanyDataEntity> {}
