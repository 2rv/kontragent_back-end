import { CommentEntity } from './comment.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CommentDto } from './dto/comment.dto';


@EntityRepository(CommentEntity)
export class CommentRepository extends Repository<CommentEntity> {

  async createComment(commentDto: CommentDto): Promise<void> {

    const { text, post, user} = commentDto

    const comment: CommentEntity = new CommentEntity()

    comment.text = text,
    comment.post = post,
    comment.user = user

  }

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
