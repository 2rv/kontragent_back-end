import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

import { PostEntity } from './../../post/post.entity';
import { UserEntity } from './../../user/user.entity';

export class CommentDto {
  @IsNotEmpty()
  @IsString()
  text: string;

  @IsOptional()
  user: UserEntity;

  @IsOptional()
  @IsString()
  post: PostEntity;
}
