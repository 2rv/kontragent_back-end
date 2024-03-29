import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  CreateDateColumn,
  OneToMany,
  OneToOne,
} from 'typeorm';
import {
  generatePasswordSalt,
  generateBcryptHash,
} from '../../common/utils/hash';
import { CompanyMemberEntity } from '../company-member/company-memeber.entity';
import { CompanyEntity } from '../company/company.entity';
import { FileEntity } from '../file/file.entity';
import { USER_ROLE } from './enum/user-role.enum';

import { ReferalEntity } from '../referal/referal.entity';
import { ReferalMemberEntity } from '../referal-member/referal-member.entity';
import { RevisionEntity } from '../revision/revision.entity';
import { CommentEntity } from '../comment/comment.entity';
import { PostEntity } from '../post/post.entity';
import { NotificationEntity } from '../notification/notification.entity';
import { FeedbackEntity } from '../feedback/feedback.entity';
import { RevisionSelfEntity } from '../revision-self/revision-self.entity';

@Entity({ name: 'user' })
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  login: string;

  @Column({ unique: true })
  phone: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: false })
  password: string;

  @Column({ unique: false })
  firstname: string;

  @Column({ unique: false })
  lastname: string;

  @Column({
    type: 'enum',
    enum: USER_ROLE,
    default: USER_ROLE.USER,
    nullable: false,
  })
  role: USER_ROLE;

  @CreateDateColumn({
    type: 'timestamptz',
  })
  createDate: string;

  @Column({ default: false })
  confirmEmail: boolean;

  @Column({ default: false })
  confirmPhone: boolean;

  @Column({ default: true })
  subscribeMailing: boolean;

  @OneToMany(() => CompanyEntity, (company) => company.user)
  company: CompanyEntity[];

  @OneToMany(() => CompanyMemberEntity, (companyMember) => companyMember.user)
  companyMember: CompanyMemberEntity[];

  @OneToMany(() => FileEntity, (file) => file.user)
  file: FileEntity[];

  @OneToOne(() => ReferalEntity, (referal) => referal.user)
  @JoinColumn()
  referal: ReferalEntity;

  @OneToOne(() => ReferalMemberEntity, (referalMember) => referalMember.user)
  @JoinColumn()
  referalMember: ReferalMemberEntity;

  @OneToMany(() => RevisionEntity, (revision) => revision.creator)
  revision: RevisionEntity[];

  @OneToMany(() => RevisionSelfEntity, (revision) => revision.creator)
  revisionSelf: RevisionSelfEntity[];

  @OneToMany(() => CommentEntity, (comment) => comment.user)
  comments: CommentEntity[];

  @OneToMany(() => PostEntity, (post: PostEntity) => post.creator)
  post: PostEntity[];

  @OneToOne(() => NotificationEntity, (notification) => notification.user)
  @JoinColumn()
  notification: NotificationEntity;

  @OneToMany(() => FeedbackEntity, (feedback: FeedbackEntity) => feedback.user)
  feedback: FeedbackEntity[];

  static async hashPassword(password: string): Promise<string> {
    const salt = await generatePasswordSalt(password);
    return generateBcryptHash(password, salt);
  }

  async validatePassword(password: string): Promise<boolean> {
    const salt = await generatePasswordSalt(password);
    const hashPassword = generateBcryptHash(password, salt);
    return this.password === hashPassword;
  }

  async updatePassword(password): Promise<void> {
    this.password = await UserEntity.hashPassword(password);
  }
}
