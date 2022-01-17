import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToOne,
  Column,
  OneToMany,
} from 'typeorm';
import { CompanyEntity } from '../company/company.entity';
import { FileEntity } from '../file/file.entity';
import { RevisionCompanyEntity } from '../revision-company/revision-company.entity';
import { RevisionEntity } from '../revision/revision.entity';

@Entity({ name: 'review' })
export class ReviewEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'review', nullable: true })
  review?: string;

  @OneToMany(() => FileEntity, (file) => file.fileReview, { nullable: true })
  fileReview?: FileEntity[];

  @ManyToOne(() => RevisionEntity, (revision) => revision.revisionReview, { nullable: true })
  revision?: RevisionEntity;

  @OneToOne(() => RevisionCompanyEntity, (revisionCompany) => revisionCompany.review, { nullable: true })
  revisionCompany?: RevisionCompanyEntity;

  @ManyToOne(() => CompanyEntity, (company) => company.review)
  company: CompanyEntity;
}
