import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import {
  generatePasswordSalt,
  generateBcryptHash,
} from '../../common/utils/hash';
import { CompanyMemberEntity } from '../company-member/company-memeber.entity';
import { CompanyEntity } from '../company/company.entity';
import { FileEntity } from '../file/file.entity';
import { USER_ROLE } from './enum/user-role.enum';

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

  @CreateDateColumn()
  createDate: string;

  @Column({ default: false })
  confirmEmail: boolean;

  @Column({ default: false })
  confirmPhone: boolean;

  @OneToMany(() => CompanyEntity, (company) => company.user)
  company: CompanyEntity;

  @OneToMany(() => CompanyMemberEntity, (companyMember) => companyMember.user)
  companyMember: CompanyMemberEntity[];

  @OneToMany(() => FileEntity, (file) => file.user)
  file: FileEntity[];

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
