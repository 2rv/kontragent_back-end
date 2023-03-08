import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
} from 'typeorm';
import { FileEntity } from '../file/file.entity';
import { UserEntity } from '../user/user.entity';
import { FEEDBACK_STATUS } from './enum/feedback-status.enum';

@Entity({ name: 'feedback' })
export class FeedbackEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    name: 'title',
  })
  title: string;

  @Column({
    type: 'enum',
    enum: FEEDBACK_STATUS,
    default: FEEDBACK_STATUS.NEW,
    nullable: false,
  })
  status: FEEDBACK_STATUS;

  @Column({
    type: 'varchar',
    name: 'description',
    nullable: true,
  })
  description: string;

  @CreateDateColumn({
    type: 'timestamptz',
  })
  createDate: string;

  @ManyToOne(() => UserEntity, (user: UserEntity) => user.feedback)
  user: UserEntity;

  @OneToMany(() => FileEntity, (file) => file.feedback)
  files: FileEntity[];
}
