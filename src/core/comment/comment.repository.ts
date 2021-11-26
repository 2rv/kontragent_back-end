import { CommentEntity } from './comment.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CommentDto } from './dto/comment.dto';
import { UserEntity } from '../user/user.entity';
import { PostEntity } from '../post/post.entity';


@EntityRepository(CommentEntity)
export class CommentRepository extends Repository<CommentEntity> {

  async createComment(commentDto: CommentDto, user: UserEntity, post: PostEntity): Promise<CommentEntity>{

    const { text} = commentDto

    const comments: CommentEntity = new CommentEntity()

    comments.text = text;
    comments.post = post;
    comments.user = user; 

    await comments.save()
    return comments
  
    
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
