import { PostEntity } from './post.entity';
import { EntityRepository, Repository } from 'typeorm';
import { UserEntity } from '../user/user.entity';

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
      // .leftJoin('post.image', 'image')
      // .leftJoin('post.creator', 'creator')
      // .leftJoin('post.comment', 'comment')
      .select([
        'post.id',
        'post.title',
        'post.description',
        'post.article',
        'post.createDate',
        // 'image',
        // 'comment',
      ])
      .where('post.id = :id', { id })
      .getOne();
  }
}
