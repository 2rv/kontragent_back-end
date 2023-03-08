import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileRepository } from '../file/file.repository';
import { AuthModule } from '../auth/auth.module';
import { FeedbackRepository } from './feedback.repository';
import { FeedbackEntity } from './feedback.entity';
import { FileEntity } from '../file/file.entity';
import { FeedbackController } from './feedback.controller';
import { FeedbackService } from './feedback.service';
import { FileService } from '../file/file.service';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([
      FileRepository,
      FileEntity,
      FeedbackRepository,
      FeedbackEntity,
    ]),
  ],

  controllers: [FeedbackController],
  providers: [FeedbackService, FileService],
  exports: [FeedbackService],
})
export class FeedbackModule {}
