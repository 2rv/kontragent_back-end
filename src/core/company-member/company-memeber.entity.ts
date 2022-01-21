import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from 'typeorm';
import { COMPANY_MEMBER_ROLE } from './enum/company-member-role.enum';
import { CompanyEntity } from '../company/company.entity';
import { UserEntity } from '../user/user.entity';

@Entity({ name: 'company-member' })
export class CompanyMemberEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => CompanyEntity, (company) => company.companyMember, {
    onDelete: 'SET NULL',
  })
  company: CompanyEntity;

  @ManyToOne(() => UserEntity, (user) => user.companyMember)
  user: UserEntity;

  @Column({
    type: 'enum',
    enum: COMPANY_MEMBER_ROLE,
    default: COMPANY_MEMBER_ROLE.MANAGER,
    nullable: false,
  })
  role: COMPANY_MEMBER_ROLE;
}
