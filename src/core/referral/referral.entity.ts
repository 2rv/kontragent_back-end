import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm';

import { ReferrerEntity } from '../referrer/referrer.entity';
import { ReferrerAwardEntity } from '../referrer-award/referrer-award.entity';
import { UserEntity } from '../user/user.entity';

@Entity({ name: 'referral' })
export class ReferralEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => UserEntity, (user) => user.referral)
  user: UserEntity;

  @ManyToOne(() => ReferrerEntity, (referrer) => referrer.referral)
  referrer: ReferrerEntity;

  @OneToMany(
    () => ReferrerAwardEntity,
    (referrerAward) => referrerAward.referral,
  )
  referrerAward: ReferrerAwardEntity[];
}
