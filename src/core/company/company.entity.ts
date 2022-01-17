import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  OneToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { CompanyBalanceEntity } from '../company-balance/company-balance.entity';
import { CompanyMemberEntity } from '../company-member/company-memeber.entity';
import { PaymentEntity } from '../payment/payment.entity';
import { RevisionEntity } from '../revision/revision.entity';
import { UserEntity } from '../user/user.entity';
import { BillEntity } from '../bill/bill.entity';
import { KontragentEntity } from '../kontragent/kontragent.entity';
import { ReviewEntity } from '../review/review.entity';

@Entity({ name: 'company' })
export class CompanyEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, nullable: true })
  name: string;

  @Column({ unique: true })
  inn: string;

  @Column({ default: false })
  verificatePayment: boolean;

  @Column({ default: false })
  verificateInfo: boolean;

  @Column({ default: false })
  registered: boolean;

  @Column({ nullable: true })
  review: string;

  @CreateDateColumn({
    type: 'timestamptz',
  })
  createDate: string;

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

  @OneToMany(() => BillEntity, (bills) => bills.company)
  bills: BillEntity[];

  @OneToMany(() => KontragentEntity, (kontragent) => kontragent.consumer)
  kontragents: KontragentEntity[];

  @OneToMany(() => ReviewEntity, (review) => review.company)
  review: ReviewEntity[];
}
