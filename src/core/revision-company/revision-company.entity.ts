import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  CreateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';

import { FileEntity } from '../file/file.entity';
import { RevisionEntity } from '../revision/revision.entity';
import { CompanyEntity } from '../company/company.entity';
import { RevisionCompanyYearEntity } from '../revision-company-year/revision-company-year.entity';
import { ReviewEntity } from '../review/review.entity';

@Entity({ name: 'revision-company' })
export class RevisionCompanyEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  description: string;

  @Column({ nullable: false })
  inn: string;

  @CreateDateColumn({
    type: 'timestamptz',
  })
  createDate: string;

  @OneToMany(
    () => RevisionCompanyYearEntity,
    (revisionCompanyYear) => revisionCompanyYear.revisionCompany,
  )
  year: RevisionCompanyYearEntity[];

  @ManyToOne(() => RevisionEntity, (revision) => revision.revisionCompanies)
  revision: RevisionEntity;

  @OneToMany(() => FileEntity, (file) => file.revisionDescription)
  fileDescription: FileEntity[];

  @OneToOne(() => ReviewEntity, (review) => review.revisionCompany)
  @JoinColumn()
  review: ReviewEntity;
}
