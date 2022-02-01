import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  JoinColumn,
  OneToOne,
  OneToMany,
  Column,
  CreateDateColumn,
} from 'typeorm';
import { CompanyEntity } from '../company/company.entity';
import { FileEntity } from '../file/file.entity';
import { CreateRevisionSelfPeriodDto } from './dto/revision-self-period.dto';

@Entity({ name: 'revision-self' })
export class RevisionSelfEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({
    type: 'timestamptz',
  })
  createDate: string;

  // @Column({
  //   type: 'enum',
  //   enum: REVISION_STATUS,
  //   default: REVISION_STATUS.NEW,
  //   nullable: false,
  // })
  // status: REVISION_STATUS;

  @Column({ nullable: false, default: 0, type: 'decimal' })
  price: number;

  // @ManyToOne(() => UserEntity, (user) => user.revision)
  // creator: UserEntity;

  @OneToOne(() => CompanyEntity, { onDelete: 'SET NULL' }) // ссылаемся на компанию не создавая на другой стороне поля
  @JoinColumn()
  company: CompanyEntity;

  @Column({ name: 'period', type: 'json' })
  period: CreateRevisionSelfPeriodDto[];

  @Column({ nullable: false })
  description: string;

  // @OneToMany(() => FileEntity, (file) => file.revisionSelf)
  // files: FileEntity[];
}
