import {
  Injectable,
  CanActivate,
  ExecutionContext,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { POST_ERROR } from '../enum/post.enum';
import { PostRepository } from '../post.repository';

import { UserEntity } from '../../user/user.entity';
import { USER_ROLE } from '../../user/enum/user-role.enum';

@Injectable()
export class PostGuard implements CanActivate {
  constructor(private postRepository: PostRepository) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { params, userAccount }: { params: any; userAccount: UserEntity } =
      request;

    if (!params.postId) {
      throw new BadRequestException();
    }

    const post = await this.postRepository.findOne({
      where: { id: params.postId },
      relations: ['creator'],
    });

    if (!post) {
      throw new ForbiddenException(POST_ERROR.POST_NOT_FOUND);
    }

    if (userAccount.role === USER_ROLE.ADMIN) return true;

    if (post.creator.id !== userAccount.id)
      throw new ForbiddenException(POST_ERROR.ACCESS_DENIED);

    return true;
  }
}
