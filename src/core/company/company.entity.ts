import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { CompanyBalanceEntity } from '../company-balance/company-balance.entity';
import { CompanyMemberEntity } from '../company-member/company-memeber.entity';
import { PaymentEntity } from '../payment/payment.entity';
import { RevisionEntity } from '../revision/revision.entity';
import { UserEntity } from '../user/user.entity';

@Entity({ name: 'company' })
export class CompanyEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column({ unique: true })
  inn: string;

  @Column({ default: false })
  verificatePayment: boolean;

  @Column({ default: false })
  verificateInfo: boolean;

  @ManyToOne(() => UserEntity, (user) => user.company)
  user: UserEntity;

  @OneToMany(
    () => CompanyMemberEntity,
    (companyMember) => companyMember.company,
  )
  companyMember: CompanyMemberEntity[];

  @OneToOne(
    () => CompanyBalanceEntity,
    (companyBalance) => companyBalance.company,
  )
  companyBalance: CompanyBalanceEntity;

  @OneToMany(() => PaymentEntity, (payment) => payment.company)
  payment: PaymentEntity[];

  @OneToMany(() => RevisionEntity, (revision) => revision.company)
  revision: RevisionEntity[];
}
