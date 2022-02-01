import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as config from 'config';
import { CompanyBalanceEntity } from 'src/core/company-balance/company-balance.entity';
import { CompanyMemberEntity } from 'src/core/company-member/company-memeber.entity';
import { CompanyEntity } from 'src/core/company/company.entity';
import { FileEntity } from 'src/core/file/file.entity';
import { PaymentEntity } from 'src/core/payment/payment.entity';
import { RevisionEntity } from '../core/revision/revision.entity';
import { UserEntity } from '../core/user/user.entity';
import { InviteEntity } from '../core/invite/invite.entity';
import { ReferalEntity } from '../core/referal/referal.entity';
import { ReferalMemberEntity } from '../core/referal-member/referal-member.entity';
import { ReferalAchievementEntity } from '../core/referal-achievement/referal-achievement.entity';
import { PostEntity } from '../core/post/post.entity';
import { CommentEntity } from '../core/comment/comment.entity';
import { BillEntity } from 'src/core/bill/bill.entity';
import { KontragentEntity } from 'src/core/kontragent/kontragent.entity';
import { CompanyDataEntity } from 'src/core/company-data/company-data.entity';
import { NotificationEntity } from 'src/core/notification/notification.entity';
import { FeedbackEntity } from 'src/core/feedback/feedback.entity';
import { ReviewEntity } from 'src/core/review/review.entity';
import { RevisionKontragentEntity } from 'src/core/revision-kontragent/revision-kontragent.entity';

const DATABASE_CONFIG = config.get('DATABASE');

export const ApiEntities = [
  UserEntity,
  CompanyEntity,
  CompanyMemberEntity,
  FileEntity,
  RevisionEntity,
  CompanyBalanceEntity,
  PaymentEntity,
  InviteEntity,
  ReferalEntity,
  ReferalMemberEntity,
  ReferalAchievementEntity,
  PostEntity,
  CommentEntity,
  BillEntity,
  KontragentEntity,
  CompanyDataEntity,
  NotificationEntity,
  FeedbackEntity,
  ReviewEntity,
  RevisionKontragentEntity,
];

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: DATABASE_CONFIG.TYPE,
  url: 'postgres://postgres:pasha1neo@localhost:5432/kontragent',
  // url: process.env.DATABASE_URL || DATABASE_CONFIG.URL,
  // ssl: { rejectUnauthorized: false },
  // logging: ['query', 'error'],
  entities: ApiEntities,
  synchronize: process.env.TYPEORM_SYNC || DATABASE_CONFIG.SYNCHRONIZE,
};
