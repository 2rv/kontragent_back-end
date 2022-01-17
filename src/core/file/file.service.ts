import { Repository } from 'typeorm';
import { FileRepository } from './file.repository';
import { FileEntity } from './file.entity';
import { FILE_ERROR } from './enum/file-error.enum';
import { Injectable } from '@nestjs/common';
import { AwsUploadFile } from '../../common/utils/aws';
import { UserEntity } from '../user/user.entity';
import { GetFileDataDto } from './dto/get-file-data.dto';
import { FilesUploadDto } from './dto/files-upload.dto';
import { NotificationEntity } from '../notification/notification.entity';

@Injectable()
export class FileService {
  constructor(private fileRepository: FileRepository) {}

  async create(file: any, user: UserEntity): Promise<FileEntity> {
    const uploadedFile = await AwsUploadFile(file);

    return await this.fileRepository.createUploadedFile(
      uploadedFile.url,
      user,
      file.originalname,
    );
  }

  // async update(id: string, body) {
  //   return await this.fileRepository.update(id, body);
  // }

  async getFileData(file: FileEntity): Promise<GetFileDataDto> {
    return {
      id: file.id,
      uuid: file.uuid,
      url: file.url,
    };
  }

  async delete(file: FileEntity) {
    await file.remove();
  }

  async createMany(
    notification: NotificationEntity,
    fileList: number[],
  ): Promise<any> {
    const uploadedFiles = [];

    for (let file of fileList) {
      const fileUrl = await AwsUploadFile(file);

      const upload = await this.fileRepository.save({
        fileUrl: fileUrl,
        notification: notification,
      });
      uploadedFiles.push(upload);
    }
    return uploadedFiles;
  }
}
