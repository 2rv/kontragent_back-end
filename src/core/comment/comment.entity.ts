import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  BaseEntity
} from 'typeorm';

import { PostEntity } from '../post/post.entity';
import { UserEntity } from '../user/user.entity';

@Entity({ name: 'comment' })
export class CommentEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
  })
  text!: string;

  @CreateDateColumn({
    readonly: true,
  })
  createDate: string;

  @ManyToOne(() => UserEntity, (user: UserEntity) => user.comments)
  @JoinColumn({
    name: 'user_id',
  })
  user!: UserEntity;

  @ManyToOne(() => PostEntity, (post: PostEntity) => post.comment, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'post',
  })
  post?: PostEntity;
}
