import { Entity, BaseEntity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'company_data' })
export class CompanyDataEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
}
