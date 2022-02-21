import * as pdf from 'html-pdf';
import { BadRequestException, Injectable } from '@nestjs/common';
import { Response } from 'express';
import kontragentReviewTemplate from 'src/template/kontragent-review';
import { FileService } from '../file/file.service';
import { UserEntity } from '../user/user.entity';
import { CreatePdfDto } from './dto/create-revision-share.dto';
import { MailService } from '../mail/mail.service';

@Injectable()
export class RevisionService {
  constructor(
    private fileService: FileService,
    private mailService: MailService,
  ) {}

  createKontragent(user: UserEntity, body: CreatePdfDto, res: Response) {
    pdf
      .create(kontragentReviewTemplate(body))
      .toBuffer(async (err, buffer: Buffer) => {
        try {
          const result = await this.fileService.create(
            {
              originalname: 'файл тест проверка.pdf',
              mimetype: 'application/pdf',
              buffer: buffer,
            },
            user,
          );
          await this.mailService.sendReviewPdf(body.email, result);
          res.send(result);
        } catch (error) {
          res.status(400).send(new BadRequestException(error));
        }
      });
  }

  createSelf(user: UserEntity, body: CreatePdfDto, res: Response) {
    pdf
      .create(kontragentReviewTemplate(body))
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
        res.send(result);
      });
  }
}
