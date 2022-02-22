import * as pdf from 'html-pdf';
import { BadRequestException, Injectable } from '@nestjs/common';
import kontragentReviewTemplate from 'src/template/kontragent-review';
import { FileService } from '../file/file.service';
import { UserEntity } from '../user/user.entity';
import { CreatePdfDto } from './dto/create-revision-share.dto';
import { MailService } from '../mail/mail.service';
import { RevisionEntity } from '../revision/revision.entity';
import { RevisionRepository } from '../revision/revision.repository';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class RevisionService {
  constructor(
    private fileService: FileService,
    private mailService: MailService,
    @InjectRepository(RevisionRepository)
    private revisionRepository: RevisionRepository,
  ) {}

  async createKontragent(
    user: UserEntity,
    revision: RevisionEntity,
    body: CreatePdfDto,
  ): Promise<void> {
    try {
      const revisionData = await this.revisionRepository.getAdminRevision(
        revision,
      );

      pdf
        .create(kontragentReviewTemplate(revisionData))
        .toBuffer(async (err, buffer: Buffer) => {
          const result = await this.fileService.create(
            {
              originalname: 'файл тест проверка.pdf',
              mimetype: 'application/pdf',
              buffer: buffer,
            },
            user,
          );
          await this.mailService.sendReviewPdf(body.email, result);
        });
      return;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
