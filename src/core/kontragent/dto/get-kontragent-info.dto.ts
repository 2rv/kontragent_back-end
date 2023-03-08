import { CompanyEntity } from '../../company/company.entity';

export interface GetKontragentInfoDto {
  id: number;
  name: string;
  consumer: CompanyEntity;
  contractor: CompanyEntity;
}
