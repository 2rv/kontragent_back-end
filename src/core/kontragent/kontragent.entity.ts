import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToOne,
  CreateDateColumn,
  Column,
  JoinColumn,
} from 'typeorm';
import { CompanyEntity } from '../company/company.entity';

@Entity({ name: 'kontragent' })
export class KontragentEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({
    type: 'timestamptz',
  })
  createDate: string;

  @Column({ name: 'name', nullable: true })
  name: string;

  @ManyToOne(() => CompanyEntity, (company) => company.kontragents)
  consumer: CompanyEntity;

  @OneToOne((t) => CompanyEntity)
  @JoinColumn()
  contractor: CompanyEntity;
}
