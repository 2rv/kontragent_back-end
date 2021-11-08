import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  BaseEntity,
  JoinColumn,
} from 'typeorm';
import { RevisionEntity } from '../revision/revision.entity';
import { UserEntity } from '../user/user.entity';

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
    () => RevisionEntity,
    (revision: RevisionEntity) => revision.fileDescription,
  )
  revisionDescription: RevisionEntity;

  @ManyToOne(
    () => RevisionEntity,
    (revision: RevisionEntity) => revision.fileReview,
  )
  revisionReview: RevisionEntity;
}
