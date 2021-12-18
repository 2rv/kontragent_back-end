import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  OneToMany,
  CreateDateColumn,
} from 'typeorm';

import { UserEntity } from '../user/user.entity';
import { FileEntity } from '../file/file.entity';
import { NOTIFICATION_TYPE } from './enum/notification-type.enum';

@Entity({ name: 'notification' })
export class NotificationEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: NOTIFICATION_TYPE,
    nullable: false,
  })
  type: NOTIFICATION_TYPE;

  @Column({
    type: 'varchar',
    name: 'message',
    nullable: true,
  })
  message: string;

  @CreateDateColumn({
    type: 'timestamptz',
  })
  createDate: string;

  @OneToOne(() => UserEntity, (user) => user.notification)
  user: UserEntity;

  @OneToMany(() => FileEntity, (file) => file.notification)
  fileList: FileEntity[];
}
