import * as pdf from 'html-pdf';
import { Injectable } from '@nestjs/common';
import { Response } from 'express';
import pdfTemplate from 'src/template/pdf-review';
import { FileService } from '../file/file.service';
import { UserEntity } from '../user/user.entity';
import { CreatePdfDto } from './dto/create-pdf.dto';
import { MailService } from '../mail/mail.service';

@Injectable()
export class PdfShareService {
  constructor(
    private fileService: FileService,
    private mailService: MailService,
  ) {}

  create(user: UserEntity, body: CreatePdfDto, res: Response) {
    pdf.create(pdfTemplate(body)).toBuffer(async (err, buffer: Buffer) => {
      const result = await this.fileService.create(
        {
          originalname: 'файл тест проверка.pdf',
          mimetype: 'application/pdf',
          buffer: buffer,
        },
        user,
      );
      await this.mailService.sendPdfShareReview(body.email, result);
      res.send(result);
    });
  }
}
