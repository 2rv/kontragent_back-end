import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToOne,
  Column,
  OneToMany,
  CreateDateColumn,
  JoinColumn,
} from 'typeorm';
import { CompanyEntity } from '../company/company.entity';
import { COMPANY_TYPE } from '../company/enum/company-type.enum';
import { FileEntity } from '../file/file.entity';
import { RevisionEntity } from '../revision/revision.entity';

@Entity({ name: 'review' })
export class ReviewEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({
    type: 'timestamptz',
  })
  createDate: string;

  @Column({ name: 'review' })
  review: string;

  @OneToMany(() => FileEntity, (file) => file.fileReview, { nullable: true })
  fileReview: FileEntity[];

  @ManyToOne(() => CompanyEntity, (company) => company.review, {
    onDelete: 'CASCADE',
  })
  company: CompanyEntity;

  @OneToOne(() => RevisionEntity, (review) => review.review)
  @JoinColumn()
  revision: RevisionEntity;

  @Column({
    type: 'enum',
    enum: COMPANY_TYPE,
    nullable: true,
  })
  type: COMPANY_TYPE;
}
