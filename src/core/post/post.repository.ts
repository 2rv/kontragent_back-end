import { PostEntity } from './post.entity';

import { EntityRepository, Repository } from 'typeorm';
import { UserEntity } from '../user/user.entity';

import { CreatePostDto } from './dto/create-post.dto';

@EntityRepository(PostEntity)
export class PostRepository extends Repository<PostEntity> {
  async getAll(): Promise<PostEntity[]> {
    return await this.createQueryBuilder('post')
      //.leftJoin('post.image', 'image')
      .select(['post.id', 'post.title', 'post.createDate'])
      .getMany();
  }
  async findAllCreated(creator: UserEntity): Promise<[PostEntity[], number]> {
    return await this.createQueryBuilder('post')
      .leftJoin('post.image', 'image')
      .leftJoin('post.creator', 'creator', 'creator.id = :id', { id: creator.id })
      .select(['post.id', 'post.title', 'post.createDate', 'image'])
      .getManyAndCount();
  }
  async findOneById(id: string): Promise<PostEntity> {
    return await this.createQueryBuilder('post')
      .leftJoin('post.creator', 'creator')
      .select([
        'post.id',
        'post.title',
        'post.description',
        'post.article',
        'post.createDate',
        'creator',
        'creator.firstname',
        'creator.lastname',
      ])
      .where('post.id = :id', { id })
      .getOne();
  }

  async createPost(
    createPostDto: CreatePostDto,
    user: UserEntity,
  ): Promise<PostEntity> {
    const { title, description, article } = createPostDto;

    const post: PostEntity = new PostEntity();
    post.title = title;
    post.description = description;
    post.article = article;
    post.creator = user;
    await post.save();

    return post;
  }
}
