import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToOne,
  Column,
  OneToMany,
} from 'typeorm';
import { FileEntity } from '../file/file.entity';
import { KontragentEntity } from '../kontragent/kontragent.entity';
import { RevisionEntity } from '../revision/revision.entity';
import { CreateRevisionKontragentPeriodDto } from './dto/revision-kontragent-period.dto';

@Entity({ name: 'revision-kontragent' })
export class RevisionKontragentEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => RevisionEntity, (company) => company.revisionKontragent, {
    onDelete: 'SET NULL',
  })
  revision: RevisionEntity;

  @ManyToOne(
    () => KontragentEntity,
    (kontragent) => kontragent.revisionKontragent,
  )
  kontragent: KontragentEntity;

  @Column({ name: 'period', type: 'json', nullable: false })
  period: CreateRevisionKontragentPeriodDto[];

  @Column({ nullable: false })
  description: string;

  @OneToMany(() => FileEntity, (file) => file.revisionKontragent)
  files: FileEntity[];
}
