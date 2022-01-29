import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToOne,
  Column,
  OneToMany,
  CreateDateColumn,
} from 'typeorm';
import { CompanyEntity } from '../company/company.entity';
import { FileEntity } from '../file/file.entity';
import { RevisionCompanyEntity } from '../revision-company/revision-company.entity';

@Entity({ name: 'review' })
export class ReviewEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({
    type: 'timestamptz',
  })
  createDate: string;

  @ManyToOne(() => CompanyEntity, (company) => company.review, {
    onDelete: 'CASCADE',
  })
  company: CompanyEntity;

  @Column({ name: 'review' })
  review: string;

  @OneToMany(() => FileEntity, (file) => file.fileReview, { nullable: true })
  fileReview?: FileEntity[];

  @OneToOne(
    () => RevisionCompanyEntity,
    (revisionCompany) => revisionCompany.review,
    { nullable: true },
  )
  revisionCompany?: RevisionCompanyEntity;
}
