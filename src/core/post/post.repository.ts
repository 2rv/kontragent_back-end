import { PostEntity } from './post.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(PostEntity)
export class PostRepository extends Repository<PostEntity> {
  async getAll(): Promise<[PostEntity[], number]> {
    return await this.createQueryBuilder('post')
      .leftJoin('post.image', 'image')
      .select(['post.id', 'post.title', 'post.createDate', 'image'])
      .getManyAndCount();
  }
  async findAllCreated(userId: number): Promise<[PostEntity[], number]> {
    return await this.createQueryBuilder('post')
      .leftJoin('post.image', 'image')
      .leftJoin('post.creator', 'creator', 'creator.id = :userId', { userId })
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
