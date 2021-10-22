import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  OneToMany,
} from 'typeorm';

import { UserEntity } from '../user/user.entity';
import { ReferralEntity } from '../referral/referral.entity';
import { ReferrerAwardEntity } from '../referrer-award/referrer-award.entity';

@Entity({ name: 'referrer' })
export class ReferrerEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => UserEntity, (user) => user.referrer)
  user: UserEntity;

  @Column({
    type: 'decimal',
    default: 0,
    nullable: false,
  })
  balance: number;

  @OneToMany(() => ReferralEntity, (referal) => referal.referrer)
  referral: ReferralEntity[];

  @OneToMany(
    () => ReferrerAwardEntity,
    (referrerAward) => referrerAward.referrer,
  )
  referrerAward: ReferrerAwardEntity[];
}
