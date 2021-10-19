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

@EntityRepository(FileEntity)
export class FileRepository extends Repository<FileEntity> {
  async createUploadedFile(url: string, user: UserEntity): Promise<FileEntity> {
    const file: FileEntity = new FileEntity();

    console.log(user);

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

  async assignFileToRevisionDescriptionById(
    revision: RevisionEntity,
    fileId: number,
  ): Promise<void> {
    const file = await this.findOne({ where: { id: fileId } });

    if (!file) {
      throw new BadRequestException(FILE_ERROR.FILE_NOT_FOUND);
    }

    file.revisionDescription = revision;

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
}