import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  OneToMany,
} from 'typeorm';

import { UserEntity } from '../user/user.entity';
import { ReferalMemberEntity } from '../referal-member/referal-member.entity';
import { ReferalPaymentEntity } from '../referal-payment/referal-payment.entity';

@Entity({ name: 'referal' })
export class ReferalEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => UserEntity, (user) => user.referal)
  user: UserEntity;

  @Column({
    type: 'decimal',
    default: 0,
    nullable: false,
  })
  balance: number;

  @OneToMany(
    () => ReferalMemberEntity,
    (referalMember) => referalMember.referal,
  )
  referalMember: ReferalMemberEntity[];

  @OneToMany(
    () => ReferalPaymentEntity,
    (referrerAchievement) => referrerAchievement.referal,
  )
  referalPayment: ReferalPaymentEntity[];
}
