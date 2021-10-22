import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from 'typeorm';

import { ReferalMemberEntity } from '../referal-member/referal-member.entity';
import { ReferalEntity } from '../referal/referal.entity';

import { REFERAL_ACHIEVEMENT_TYPE } from './enum/referal-achievement-type.enum';

@Entity({ name: 'referal-achievement' })
export class ReferalAchievementEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: REFERAL_ACHIEVEMENT_TYPE,
    nullable: false,
  })
  type: REFERAL_ACHIEVEMENT_TYPE;

  @Column({
    type: 'decimal',
    nullable: false,
  })
  award: number;

  @ManyToOne(
    () => ReferalMemberEntity,
    (referalMember) => referalMember.referalAchievement,
  )
  referalMember: ReferalMemberEntity;

  @ManyToOne(() => ReferalEntity, (referal) => referal.referalAchievement)
  referal: ReferalEntity;
}
