import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from 'typeorm';

import { ReferralEntity } from '../referral/referral.entity';
import { ReferrerEntity } from '../referrer/referrer.entity';

import { REFERRER_AWARD_TYPE } from './enum/referrer-award-type.enum';

@Entity({ name: 'referrer-award' })
export class ReferrerAwardEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: REFERRER_AWARD_TYPE,
    nullable: false,
  })
  type: REFERRER_AWARD_TYPE;

  @Column({
    type: 'decimal',
    nullable: false,
  })
  award: number;

  @ManyToOne(() => ReferralEntity, (referral) => referral.referrerAward)
  referral: ReferralEntity;

  @ManyToOne(() => ReferrerEntity, (referrer) => referrer.referrerAward)
  referrer: ReferrerEntity;
}
