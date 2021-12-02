import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { CompanyEntity } from '../company/company.entity';

@Entity({ name: 'kontragent' })
export class KontragentEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createDate: string;

  @ManyToOne(() => CompanyEntity, (company) => company.kontragents)
  consumer: CompanyEntity;

  contractor: CompanyEntity;
}
