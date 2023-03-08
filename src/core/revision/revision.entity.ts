import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';

import { REVISION_STATUS } from './enum/revision-status.enum';

import { CompanyEntity } from '../company/company.entity';
import { UserEntity } from '../user/user.entity';
import { RevisionKontragentEntity } from '../revision-kontragent/revision-kontragent.entity';
import { FileEntity } from '../file/file.entity';

@Entity({ name: 'revision' })
export class RevisionEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({
    type: 'timestamptz',
  })
  createDate: string;

  @Column({
    type: 'enum',
    enum: REVISION_STATUS,
    default: REVISION_STATUS.NEW,
    nullable: false,
  })
  status: REVISION_STATUS;

  @Column({ nullable: false, default: 0, type: 'decimal' })
  paymentPrice: number;

  @Column({ nullable: false, default: 0, type: 'decimal' })
  price: number;

  @ManyToOne(() => UserEntity, (user) => user.revision)
  creator: UserEntity;

  @ManyToOne(() => CompanyEntity, (company) => company.revision, {
    onDelete: 'SET NULL',
  })
  company: CompanyEntity;

  @OneToMany(
    () => RevisionKontragentEntity,
    (kontragent) => kontragent.revision,
    { cascade: true },
  )
  revisionKontragent: RevisionKontragentEntity[];

  @Column({ name: 'review', nullable: true })
  review: string;

  @OneToMany(() => FileEntity, (file) => file.revisionFilesReview, {
    nullable: true,
  })
  filesReview: FileEntity[];
}
