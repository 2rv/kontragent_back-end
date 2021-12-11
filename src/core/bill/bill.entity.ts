import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
} from 'typeorm';
import { CompanyEntity } from '../company/company.entity';
import { FileEntity } from '../file/file.entity';
import { BILL_STATUS } from './enum/bill-status.enum';

@Entity({ name: 'bill' })
export class BillEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => CompanyEntity, (company) => company.bills)
  company: CompanyEntity;

  @OneToMany(() => FileEntity, (file) => file.bill)
  files: FileEntity[];

  @Column({
    type: 'enum',
    enum: BILL_STATUS,
    default: BILL_STATUS.NEW,
    nullable: false,
  })
  status: BILL_STATUS;

  @Column({
    type: 'decimal',
    nullable: false,
  })
  amount: number;

  @Column({
    type: 'varchar',
    name: 'description',
    nullable: true,
  })
  description?: string;

  @CreateDateColumn({
    type: 'timestamptz',
  })
  createDate: string;
}
