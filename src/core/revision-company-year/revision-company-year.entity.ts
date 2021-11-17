import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  BaseEntity,
  JoinColumn,
} from 'typeorm';

import { UserEntity } from '../user/user.entity';
import { RevisionEntity } from '../revision/revision.entity';
import { RevisionCompanyEntity } from '../revision-company/revision-company.entity';

@Entity({ name: 'revision-company-year' })
export class RevisionCompanyYearEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  year: string;

  @Column()
  firstPeriod: boolean;

  @Column()
  secondPeriod: boolean;

  @Column()
  thirdPeriod: boolean;

  @Column()
  fourthPeriod: boolean;

  @ManyToOne(
    () => RevisionCompanyEntity,
    (revisionCompany) => revisionCompany.year,
  )
  revisionCompany: RevisionCompanyEntity;
}
