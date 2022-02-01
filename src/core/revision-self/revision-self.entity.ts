import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  JoinColumn,
  OneToOne,
  OneToMany,
  Column,
} from 'typeorm';
import { CompanyEntity } from '../company/company.entity';
import { FileEntity } from '../file/file.entity';
import { RevisionEntity } from '../revision/revision.entity';
import { CreateRevisionSelfPeriodDto } from './dto/revision-self-period.dto';

@Entity({ name: 'revision-self' })
export class RevisionSelfEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => RevisionEntity, (company) => company.revisionSelf)
  @JoinColumn()
  revision: RevisionEntity;

  @OneToOne(() => CompanyEntity, { onDelete: 'SET NULL' }) // ссылаемся на компанию не создавая на другой стороне поля
  @JoinColumn()
  company: CompanyEntity;

  @Column({ name: 'period', type: 'json' })
  period: CreateRevisionSelfPeriodDto[];

  @Column({ nullable: false })
  description: string;

  @OneToMany(() => FileEntity, (file) => file.revisionSelf)
  files: FileEntity[];
}
