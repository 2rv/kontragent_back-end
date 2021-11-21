import { CommentEntity } from './comment.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(CommentEntity)
export class CommentRepository extends Repository<CommentEntity> {
  async findPostComment(postId: string): Promise<CommentEntity[]> {
    return await this.createQueryBuilder('comment')
      .leftJoin('comment.post', 'post')
      .leftJoin('comment.user', 'user')
      .where('post.id = :postId', { postId })
      .select([
        'comment.id',
        'comment.text',
        'comment.createDate',
        'post',
        'user',
      ])
      .getMany();
  }
}
