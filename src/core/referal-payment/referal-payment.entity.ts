import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { ReferalMemberEntity } from '../referal-member/referal-member.entity';
import { ReferalEntity } from '../referal/referal.entity';
import { REFERAL_PAYMENT_TYPE } from './enum/referal-payment-type.enum';

@Entity({ name: 'referal-payment' })
export class ReferalPaymentEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({
    type: 'timestamptz',
  })
  createDate: Date;

  @Column({
    type: 'decimal',
    nullable: false,
  })
  amount: number;

  @Column({
    type: 'enum',
    enum: REFERAL_PAYMENT_TYPE,
    nullable: false,
  })
  type: REFERAL_PAYMENT_TYPE;

  @ManyToOne(() => ReferalEntity, (referal) => referal.referalPayment, {
    onDelete: 'CASCADE',
  })
  referal: ReferalEntity;

  @OneToOne(() => ReferalMemberEntity)
  @JoinColumn()
  referalMember: ReferalMemberEntity;
}
