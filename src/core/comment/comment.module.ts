import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from '../auth/auth.module';

import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { CommentRepository } from './comment.repository';
import { CommentEntity } from './comment.entity';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([CommentRepository, CommentEntity]),
  ],
  providers: [CommentService],
  exports: [CommentService],
  controllers: [CommentController],
})
export class CommentModule {}
