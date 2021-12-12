import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { CompanyEntity } from '../company/company.entity';
import { PAYMENT_TYPE } from './enum/payment-type.enum';

@Entity({ name: 'payment' })
export class PaymentEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => CompanyEntity, (company) => company.payment)
  company: CompanyEntity;

  @Column({
    type: 'decimal',
    default: 0,
    nullable: false,
  })
  amount: number;

  @CreateDateColumn({
    type: 'timestamptz',
  })
  createDate: number;

  @Column({
    type: 'enum',
    enum: PAYMENT_TYPE,
    default: PAYMENT_TYPE.OUT,
    nullable: false,
  })
  type: PAYMENT_TYPE;
}
