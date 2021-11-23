import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  BaseEntity,
  OneToMany,
  OneToOne,
  ManyToOne,
} from 'typeorm';
import { CommentEntity } from './../comment/comment.entity';
import { FileEntity } from '../file/file.entity';
import { UserEntity } from '../user/user.entity';

@Entity({ name: 'post' })
export class PostEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({
    readonly: true,
  })
  createDate: string;

  @OneToMany(() => CommentEntity, (comment: CommentEntity) => comment.post)
  comment: CommentEntity[];

  @OneToOne(() => FileEntity, (file: FileEntity) => file.post)
  image: FileEntity;

  @ManyToOne(() => UserEntity, (user: UserEntity) => user.post)
  creator: UserEntity;

  @Column({
    type: 'varchar',
    name: 'title',
  })
  title!: string;

  @Column({
    type: 'varchar',
    name: 'description',
  })
  description!: string;

  @Column({
    type: 'json',
    name: 'article',
  })
  article: {
    blocks: [];
    time: number;
    version: string;
  };
}
