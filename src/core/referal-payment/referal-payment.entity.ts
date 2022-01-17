import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from 'typeorm';

import { ReferalMemberEntity } from '../referal-member/referal-member.entity';
import { ReferalEntity } from '../referal/referal.entity';

import { REFERAL_PAYMENT_TYPE } from './enum/referal-payment-type.enum';

@Entity({ name: 'referal-payment' })
export class ReferalPaymentEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: REFERAL_PAYMENT_TYPE,
    nullable: false,
  })
  type: REFERAL_PAYMENT_TYPE;

  @Column({
    type: 'decimal',
    nullable: false,
  })
  award: number;

  @ManyToOne(
    () => ReferalMemberEntity,
    (referalMember) => referalMember.referalPayment,
  )
  referalMember: ReferalMemberEntity;

  @ManyToOne(() => ReferalEntity, (referal) => referal.referalPayment)
  referal: ReferalEntity;
}
