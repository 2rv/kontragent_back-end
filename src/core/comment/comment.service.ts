import { CommentRepository } from './comment.repository';
import { Injectable, BadRequestException } from '@nestjs/common';
import { CommentDto } from './dto/comment.dto';
import { CommentEntity } from './comment.entity';
import { COMMENT_ERROR } from './enum/comment.enum';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { UserEntity } from '../user/user.entity';
import { USER_ROLE } from '../user/enum/user-role.enum';
import { PostEntity } from '../post/post.entity';


@Injectable()
export class CommentService {
  constructor(private commentRepository: CommentRepository) {}

  async create(commentDto: CommentDto, user: UserEntity, post: PostEntity): Promise<CommentEntity> {
    return await this.commentRepository.createComment(commentDto, user, post);
  }

  async delete(id: string, user: UserEntity) {
    const comment = await this.commentRepository.findOne({
      where: {
        id: id
      },
    });

     if (user.role === USER_ROLE.ADMIN) {
      return await this.commentRepository.delete(comment.id);
    }
    
    if (!comment) {
      throw new BadRequestException(COMMENT_ERROR.COMMENT_NOT_FOUND);
    } else return await this.commentRepository.delete(comment.id);
  }

  async getPostComment(postId: string) {
    return await this.commentRepository.findPostComment(postId);
  }

  async update(id: string, body: UpdateCommentDto) {
    const result = await this.commentRepository.findOne({
      where: {
        id: id,
        user: body.user,
      },
    });
    if (!result) {
      throw new BadRequestException(COMMENT_ERROR.COMMENT_NOT_FOUND);
    } else await this.commentRepository.update(id, body);
    return await this.commentRepository.findOne(id);
  }
}
