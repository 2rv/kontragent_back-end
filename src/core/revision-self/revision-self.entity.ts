import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  OneToMany,
  Column,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';

import { CompanyEntity } from '../company/company.entity';
import { UserEntity } from '../user/user.entity';
import { FileEntity } from '../file/file.entity';

import { REVISION_SELF_STATUS } from './enum/revision-self-status.enum';
import { CreateRevisionSelfPeriodDto } from './dto/revision-self-period.dto';

@Entity({ name: 'revision-self' })
export class RevisionSelfEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({
    type: 'timestamptz',
  })
  createDate: string;

  @Column({
    type: 'enum',
    enum: REVISION_SELF_STATUS,
    default: REVISION_SELF_STATUS.NEW,
    nullable: false,
  })
  status: REVISION_SELF_STATUS;

  @Column({ nullable: false, default: 0, type: 'decimal' })
  paymentPrice: number;

  @Column({ nullable: false, default: 0, type: 'decimal' })
  price: number;

  @ManyToOne(() => UserEntity, (user) => user.revisionSelf)
  creator: UserEntity;

  @ManyToOne(() => CompanyEntity, (company) => company.revisionSelf, {
    onDelete: 'SET NULL',
  })
  company: CompanyEntity;

  @Column({ name: 'period', type: 'json', nullable: false })
  period: CreateRevisionSelfPeriodDto[];

  @Column({ nullable: false })
  description: string;

  @OneToMany(() => FileEntity, (file) => file.revisionSelf)
  files: FileEntity[];

  @Column({ name: 'review', nullable: true })
  review: string;

  @OneToMany(() => FileEntity, (file) => file.revisionSelfFilesReview, {
    nullable: true,
  })
  filesReview: FileEntity[];
}
