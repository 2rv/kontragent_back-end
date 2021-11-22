import { PostEntity } from './post.entity';
import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostRepository } from './post.repository';
import { FileService } from '../file/file.service';
import { FileRepository } from '../file/file.repository';
import { UserEntity } from '../user/user.entity';

@Injectable()
export class PostService {
  constructor(
    private postRepository: PostRepository,
    private fileRepository: FileRepository,
    private fileService: FileService,
  ) {}

  async create(
    createPostDto: CreatePostDto,
    creator: UserEntity,
  ): Promise<PostEntity> {
    return this.postRepository.createPost(createPostDto, creator);
  }

  async getOne(id: string): Promise<PostEntity> {
    return await this.postRepository.findOneById(id);
  }

  async getAll(): Promise<PostEntity[]> {
    return await this.postRepository.getAll();
  }

  async getAllCreated(creator: UserEntity): Promise<[PostEntity[], number]> {
    return await this.postRepository.findAllCreated(creator);
  }

  async update(id: string, updatePostDto: UpdatePostDto) {
    const post: PostEntity = await this.postRepository.findOneOrFail(id);

    if (updatePostDto.imageId) {
      if (updatePostDto.imageId !== post.image.id) {
        await this.fileService.delete(post.image);
      }
      await this.fileRepository.assignFileToPostById(
        post,
        updatePostDto.imageId,
      );
    }

    Object.assign(post, { ...updatePostDto });
    return await this.postRepository.save(post);
  }

  async delete(id: string) {
    const post = await this.postRepository.findOneOrFail(id);
    return await this.postRepository.delete(post.id);
  }
}
