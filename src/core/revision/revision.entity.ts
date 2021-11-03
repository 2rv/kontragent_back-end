import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { CompanyEntity } from '../company/company.entity';
import { FileEntity } from '../file/file.entity';
import { REVISION_STATUS } from './enum/revision-status.enum';

@Entity({ name: 'revision' })
export class RevisionEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  title: string;

  @Column({ nullable: false })
  description: string;

  @Column({ nullable: false })
  inn: string;

  @Column({
    type: 'enum',
    enum: REVISION_STATUS,
    default: REVISION_STATUS.NEW,
    nullable: false,
  })
  status: REVISION_STATUS;

  @Column({ nullable: true })
  review: string;

  @Column('simple-json')
  year: { name: string; period: boolean[] }[];

  @Column({ nullable: false, default: 0, type: 'decimal' })
  price: number;

  @OneToMany(() => FileEntity, (file) => file.revisionDescription)
  fileDescription: FileEntity[];

  @OneToMany(() => FileEntity, (file) => file.revisionReview)
  fileReview: FileEntity[];

  @ManyToOne(() => CompanyEntity, (company) => company.revision)
  company: CompanyEntity;
}
