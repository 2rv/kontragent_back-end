import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToOne,
  CreateDateColumn,
} from 'typeorm';

import { ReferalEntity } from '../referal/referal.entity';
import { UserEntity } from '../user/user.entity';

@Entity({ name: 'referal-member' })
export class ReferalMemberEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({
    type: 'timestamptz',
  })
  createDate: number;

  @OneToOne(() => UserEntity, (user) => user.referalMember)
  user: UserEntity;

  @ManyToOne(() => ReferalEntity, (referal) => referal.referalMember)
  referal: ReferalEntity;
}
