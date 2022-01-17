import { FileEntity } from './file.entity';
import { EntityRepository, Repository } from 'typeorm';
import { UserEntity } from '../user/user.entity';
import {
  BadRequestException,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { FILE_ERROR } from './enum/file-error.enum';
import { RevisionEntity } from '../revision/revision.entity';
import { PostEntity } from '../post/post.entity';
import { RevisionCompanyEntity } from '../revision-company/revision-company.entity';
import { BillEntity } from '../bill/bill.entity';

import { NotificationEntity } from '../notification/notification.entity';
import { AwsUploadFile } from '../../common/utils/aws';

import { FeedbackEntity } from '../feedback/feedback.entity';

@EntityRepository(FileEntity)
export class FileRepository extends Repository<FileEntity> {
  async createUploadedFile(
    url: string,
    user: UserEntity,
    originalName: string,
  ): Promise<FileEntity> {
    const file: FileEntity = new FileEntity();

    console.log(user);

    file.originalName = originalName;
    file.user = user;
    file.url = url;

    try {
      await file.save();
      return file;
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException(
          FILE_ERROR.FILE_WITH_THIS_URL_ALREADY_EXISTS,
        );
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async assignFileToRevisionCompanyDescriptionById(
    revisionCompany: RevisionCompanyEntity,
    fileId: number,
  ): Promise<void> {
    const file = await this.findOne({ where: { id: fileId } });

    if (!file) {
      throw new BadRequestException(FILE_ERROR.FILE_NOT_FOUND);
    }

    file.revisionDescription = revisionCompany;

    await file.save();
  }

  async assignFileToRevisionReviewById(
    revision: RevisionEntity,
    fileId: number,
  ): Promise<void> {
    const file = await this.findOne({ where: { id: fileId } });

    if (!file) {
      throw new BadRequestException(FILE_ERROR.FILE_NOT_FOUND);
    }

    file.revisionReview = revision;

    await file.save();
  }

  async assignFileToBillById(bill: BillEntity, fileId: number): Promise<void> {
    const file = await this.findOne({ where: { id: fileId } });
    if (!file) {
      throw new BadRequestException(FILE_ERROR.FILE_NOT_FOUND);
    }

    file.bill = bill;

    await file.save();
  }

  async assignFileToNotificationById(
    notification: NotificationEntity,
    fileId: number,
  ): Promise<FileEntity> {
    const file = await this.findOne({ where: { id: fileId } });
    if (!file) {
      throw new BadRequestException(FILE_ERROR.FILE_NOT_FOUND);
    }

    file.notification = notification;

    await file.save();

    return file;
  }
  
 
  async assignFileToFeedbackById(
    feedback: FeedbackEntity,
    fileId: number,
  ): Promise<void> {
    const file = await this.findOne({ where: { id: fileId } });
    if (!file) {
      throw new BadRequestException(FILE_ERROR.FILE_NOT_FOUND);
    }

    file.feedback = feedback;

    await file.save();
  }

  async getRevisionDescriptionFileList(revision: RevisionEntity) {
    const query = this.createQueryBuilder('file');

    query.leftJoin('file.revisionDescription', 'revision');

    query.where('revision.id = :id', { id: revision.id });

    return query.getMany();
  }

  async getRevisionReviewFileList(revision: RevisionEntity) {
    const query = this.createQueryBuilder('file');

    query.leftJoin('file.revisionReview', 'revision');

    query.where('revision.id = :id', { id: revision.id });

    return query.getMany();
  }

  async assignFileToPostById(post: PostEntity, fileId: number): Promise<void> {
    const file = await this.findOne({ where: { id: fileId } });
    if (!file) {
      throw new BadRequestException(FILE_ERROR.FILE_NOT_FOUND);
    }

    file.post = post;
    await file.save();
  }
}
