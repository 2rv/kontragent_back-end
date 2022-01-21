import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { CompanyEntity } from '../company/company.entity';

@Entity({ name: 'company-balance' })
export class CompanyBalanceEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => CompanyEntity, (company) => company.companyBalance, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  company: CompanyEntity;

  @Column({
    type: 'decimal',
    default: 0,
    nullable: false,
  })
  amount: number;
}
