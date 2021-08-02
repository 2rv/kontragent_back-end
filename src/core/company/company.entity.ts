import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from 'typeorm';
import { CompanyUserEntity } from '../company-user/company-user.entity';

@Entity({ name: 'company' })
export class CompanyEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column({ unique: true })
  inn: string;

  @OneToMany(() => CompanyUserEntity, (companyUser) => companyUser.company)
  companyUser: CompanyUserEntity[];

  @Column({ default: false })
  verification: boolean;
}
