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
import { RevisionCompanyEntity } from '../revision-company/revision-company.entity';
import { FileEntity } from '../file/file.entity';
import { UserEntity } from '../user/user.entity';
import { ReviewEntity } from '../review/review.entity';

@Entity({ name: 'revision' })
export class RevisionEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: REVISION_STATUS,
    default: REVISION_STATUS.NEW,
    nullable: false,
  })
  status: REVISION_STATUS;

  @Column({ nullable: true })
  review: string;

  @Column({ nullable: false, default: 0, type: 'decimal' })
  additionPrice: number;

  @OneToMany(() => FileEntity, (file) => file.revisionReview)
  fileReview: FileEntity[];

  @OneToMany(
    () => RevisionCompanyEntity,
    (revisionCompany) => revisionCompany.revision,
  )
  revisionCompanies: RevisionCompanyEntity[];

  @OneToMany(() => ReviewEntity, (review) => review.revision)
  revisionReview: ReviewEntity[];

  @ManyToOne(() => CompanyEntity, (company) => company.revision)
  company: CompanyEntity;

  @ManyToOne(() => UserEntity, (user) => user.revision)
  creator: UserEntity;

  @CreateDateColumn({
    type: 'timestamptz',
  })
  createDate: string;

  @Column({ default: false })
  selfRevision: boolean;
}
