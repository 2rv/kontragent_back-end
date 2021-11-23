import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from '../auth/auth.module';

import { PostController } from './post.controller';
import { PostService } from './post.service';
import { PostRepository } from './post.repository';
import { PostEntity } from './post.entity';

import { FileRepository } from '../file/file.repository';
import { FileService } from '../file/file.service';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([PostRepository, FileRepository, PostEntity]),
  ],
  providers: [PostService, FileService],
  exports: [PostService],
  controllers: [PostController],
})
export class PostModule {}
