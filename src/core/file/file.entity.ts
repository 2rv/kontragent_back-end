import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  BaseEntity,
  JoinColumn,
  OneToOne,
} from 'typeorm';

import { UserEntity } from '../user/user.entity';
import { RevisionEntity } from '../revision/revision.entity';
import { RevisionCompanyEntity } from '../revision-company/revision-company.entity';
import { PostEntity } from '../post/post.entity';
import { BillEntity } from '../bill/bill.entity';
import { NotificationEntity } from '../notification/notification.entity';
import { FeedbackEntity } from '../feedback/feedback.entity';
import { ReviewEntity } from '../review/review.entity';

@Entity({ name: 'file' })
export class FileEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column({
    type: 'varchar',
    name: 'original_name',
    nullable: false,
  })
  originalName: string;

  @Column({
    type: 'varchar',
    name: 'file_url',
    nullable: false,
  })
  url: string;

  @ManyToOne(() => UserEntity, (user: UserEntity) => user.file)
  @JoinColumn()
  user: UserEntity;

  @ManyToOne(
    () => RevisionCompanyEntity,
    (revisionCompany: RevisionCompanyEntity) => revisionCompany.fileDescription,
  )
  revisionDescription: RevisionCompanyEntity;

  @ManyToOne(
    () => RevisionEntity,
    (revision: RevisionEntity) => revision.fileReview,
  )
  revisionReview: RevisionEntity;

  @OneToOne(() => PostEntity, (post: PostEntity) => post.image)
  post: PostEntity;

  @ManyToOne(() => BillEntity, (bill: BillEntity) => bill.files, {
    onDelete: 'CASCADE',
  })
  bill: BillEntity;

  @ManyToOne(
    () => NotificationEntity,
    (notification: NotificationEntity) => notification.fileList,
  )
  notification: NotificationEntity;
  
  @ManyToOne(() => FeedbackEntity, (feedback: FeedbackEntity) => feedback.files)
  feedback: FeedbackEntity;

  @ManyToOne(() => ReviewEntity, (review: ReviewEntity) => review.fileReview)
  fileReview: ReviewEntity;
}
