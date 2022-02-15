import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToOne,
  CreateDateColumn,
  Column,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { CompanyEntity } from '../company/company.entity';
import { RevisionKontragentEntity } from '../revision-kontragent/revision-kontragent.entity';

@Entity({ name: 'kontragent' })
export class KontragentEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({
    type: 'timestamptz',
  })
  createDate: string;

  @Column({ name: 'name', nullable: true })
  name: string;

  @Column({ name: 'email', nullable: true })
  email: string;

  @Column({ name: 'comment', nullable: true })
  comment: string;

  @Column({ name: 'rating', type: 'int', nullable: true })
  rating: number;

  @ManyToOne(() => CompanyEntity, (company) => company.kontragents, {
    onDelete: 'CASCADE',
  })
  consumer: CompanyEntity; // компания которая которая присваивает себе contractor

  @OneToOne(() => CompanyEntity, { onDelete: 'CASCADE' })
  @JoinColumn()
  contractor: CompanyEntity; // это компания на которую ссылкается consumer

  @OneToMany(
    () => RevisionKontragentEntity,
    (revisionKontragent) => revisionKontragent.kontragent,
  )
  revisionKontragent: RevisionKontragentEntity[];
}
