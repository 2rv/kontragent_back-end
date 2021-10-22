import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  CreateDateColumn,
} from 'typeorm';

import { ReferalEntity } from '../referal/referal.entity';
import { ReferalAchievementEntity } from '../referal-achievement/referal-achievement.entity';
import { UserEntity } from '../user/user.entity';

@Entity({ name: 'referal-member' })
export class ReferalMemberEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createDate: number;

  @OneToOne(() => UserEntity, (user) => user.referalMember)
  user: UserEntity;

  @ManyToOne(() => ReferalEntity, (referal) => referal.referalMember)
  referal: ReferalEntity;

  @OneToMany(
    () => ReferalAchievementEntity,
    (referrerAward) => referrerAward.referalMember,
  )
  referalAchievement: ReferalAchievementEntity[];
}