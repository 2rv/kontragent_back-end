import {
  Body,
  Controller,
  Param,
  Post,
  UseGuards,
  ValidationPipe,
  Get,
  Query,
  Request,
  Delete,
  Patch,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentDto } from './dto/comment.dto';
import { AuthGuard } from '@nestjs/passport';
import { AccountGuard } from '../user/guard/account.guard';
import { Roles } from '../user/decorator/role.decorator';
import { USER_ROLE } from '../user/enum/user-role.enum';
import { CommentEntity } from './comment.entity';
import { UserEntity } from '../user/user.entity';
import { GetAccount } from '../user/decorator/get-account.decorator';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post('/create')
  @UseGuards(AuthGuard(), AccountGuard)
  async create(@Body(ValidationPipe) commentDto: CommentDto) {
    return await this.commentService.create(commentDto);
  }

  @Delete('/delete/:id')
  @UseGuards(AuthGuard('jwt'), AccountGuard)
  async delete(@Param('id') id: string, @GetAccount() user: UserEntity) {
    return await this.commentService.delete(id, user);
  }

  @Get('/get/post/:id')
  async getPostComment(@Param('id') id: string): Promise<CommentEntity[]> {
    return await this.commentService.getPostComment(id);
  }

  @Patch('/update/:id')
  @Roles(USER_ROLE.USER, USER_ROLE.ADMIN)
  @UseGuards(AuthGuard('jwt'), AccountGuard)
  async update(@Param('id') id: string, @Body() body, @Request() req) {
    body.userId = req.user.id;
    return await this.commentService.update(id, body);
  }
}
