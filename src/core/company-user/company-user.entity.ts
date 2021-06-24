import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { COMPANY_USER_ROLE } from './enum/company-user-role.enum';
import { CompanyEntity } from '../company/company.entity';
import { UserEntity } from '../user/user.entity';

@Entity({ name: 'company-user' })
export class CompanyUserEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => CompanyEntity, (company) => company.companyUser)
  company: CompanyEntity;

  @JoinColumn()
  @ManyToOne(() => UserEntity, (user) => user.companyUser, {
    cascade: true,
  })
  user: UserEntity;

  @Column()
  position: string;

  @Column({
    type: 'enum',
    enum: COMPANY_USER_ROLE,
    default: COMPANY_USER_ROLE.MANAGER,
    nullable: false,
  })
  role: COMPANY_USER_ROLE;
}
