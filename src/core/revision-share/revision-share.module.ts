import { Module } from '@nestjs/common';
import { RevisionController } from './revision-share.controller';
import { RevisionService } from './revision-share.service';
import { AuthModule } from '../auth/auth.module';
import { FileModule } from '../file/file.module';
import { MailModule } from '../mail/mail.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RevisionRepository } from '../revision/revision.repository';
import { RevisionSelfRepository } from '../revision-self/revision-self.repository';

@Module({
  imports: [
    AuthModule,
    FileModule,
    MailModule,
    TypeOrmModule.forFeature([RevisionRepository, RevisionSelfRepository]),
  ],
  providers: [RevisionService],
  exports: [RevisionService],
  controllers: [RevisionController],
})
export class RevisionShare {}
