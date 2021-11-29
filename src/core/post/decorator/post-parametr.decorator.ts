import { createParamDecorator } from '@nestjs/common';
import {PostEntity} from '../post.entity'

export const GetPost = createParamDecorator((data: string, context) => {
  const post: PostEntity = context.switchToHttp().getRequest().post;

  return data ? post && post[data] : post;
});
