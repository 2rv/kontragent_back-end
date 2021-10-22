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
import { ReferalAchievementEntity } from '../referal-achievement/referal-achievement.entity';

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
    () => ReferalAchievementEntity,
    (referrerAchievement) => referrerAchievement.referal,
  )
  referalAchievement: ReferalAchievementEntity[];
}
