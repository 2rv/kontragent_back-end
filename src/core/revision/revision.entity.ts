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
import { UserEntity } from '../user/user.entity';

@Entity({ name: 'revision' })
export class RevisionEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({
    type: 'timestamptz',
  })
  createDate: string;

  @Column({ default: false })
  selfRevision: boolean;

  @Column({
    type: 'enum',
    enum: REVISION_STATUS,
    default: REVISION_STATUS.NEW,
    nullable: false,
  })
  status: REVISION_STATUS;

  @Column({ nullable: false, default: 0, type: 'decimal' })
  additionPrice: number;

  @ManyToOne(() => CompanyEntity, (company) => company.revision, {
    onDelete: 'SET NULL',
  })
  company: CompanyEntity;

  @ManyToOne(() => UserEntity, (user) => user.revision)
  creator: UserEntity;

  @OneToMany(
    () => RevisionCompanyEntity,
    (revisionCompany) => revisionCompany.revision,
  )
  revisionCompanies: RevisionCompanyEntity[];
}
