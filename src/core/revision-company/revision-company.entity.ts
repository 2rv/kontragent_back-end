import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
} from 'typeorm';

import { FileEntity } from '../file/file.entity';
import { RevisionEntity } from '../revision/revision.entity';
import { RevisionCompanyYearEntity } from '../revision-company-year/revision-company-year.entity';

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

  @OneToMany(
    () => RevisionCompanyYearEntity,
    (revisionCompanyYear) => revisionCompanyYear.revisionCompany,
  )
  year: RevisionCompanyYearEntity[];

  @ManyToOne(() => RevisionEntity, (revision) => revision.revisionCompanies)
  revision: RevisionEntity;

  @OneToMany(() => FileEntity, (file) => file.revisionDescription)
  fileDescription: FileEntity[];
}
