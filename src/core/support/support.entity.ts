import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { UserEntity } from '../user/user.entity';

@Entity({ name: 'support-requests' })
export class SupportEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity, (user) => user.myRequestsInSupport)
  creator: UserEntity;

  @Column()
  categoryId: number;

  @Column()
  brief: string;

  @Column()
  explicitly: string;
}
