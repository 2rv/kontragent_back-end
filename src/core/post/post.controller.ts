import {
  Body,
  Controller,
  Param,
  Post,
  UseGuards,
  ValidationPipe,
  Get,
  Put,
  Delete,
} from '@nestjs/common';

import { Roles } from '../user/decorator/role.decorator';
import { USER_ROLE } from '../user/enum/user-role.enum';

import { AuthGuard } from '@nestjs/passport';
import { AccountGuard } from '../user/guard/account.guard';
import { PostParametrGuard } from './guard/post-parametr.guard';
import { PostGuard } from './guard/post.guard';

import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

import { GetAccount } from '../user/decorator/get-account.decorator';
import { PostService } from './post.service';
import { UserEntity } from '../user/user.entity';

@Controller('post')
export class PostController {
  constructor(private postService: PostService) {}

  @Post('/create')
  @UseGuards(AuthGuard(), AccountGuard)
  async save(@Body(ValidationPipe) createPostDto: CreatePostDto) {
    return await this.postService.create(createPostDto);
  }

  @Get('/get')
  async getAll() {
    return await this.postService.getAll();
  }

  @Get('/created/get')
  @UseGuards(AuthGuard(), AccountGuard)
  async getAllCreated(@GetAccount() user: UserEntity) {
    return await this.postService.getAllCreated(user.id);
  }

  @Get('get/:postId')
  @UseGuards(AuthGuard(), AccountGuard, PostParametrGuard)
  async getOne(@Param('postId') id: string) {
    return await this.postService.getOne(id);
  }

  @Put('/update/:postId')
  @UseGuards(AuthGuard(), AccountGuard, PostGuard)
  async update(@Param('postId') id: string, @Body() body: UpdatePostDto) {
    return await this.postService.update(id, body);
  }

  @Delete('/delete/:postId')
  @Roles(USER_ROLE.ADMIN)
  @UseGuards(AuthGuard(), AccountGuard, PostGuard)
  async delete(@Param('postId') id: string) {
    return await this.postService.delete(id);
  }
}
