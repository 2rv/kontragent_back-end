import { Controller, Post, UseGuards, Body, Res } from '@nestjs/common';
import { RevisionService } from './revision-share.service';
import { AuthGuard } from '@nestjs/passport';
import { AccountGuard } from '../user/guard/account.guard';
import { Roles } from '../user/decorator/role.decorator';
import { USER_ROLE } from '../user/enum/user-role.enum';
import { GetAccount } from '../user/decorator/get-account.decorator';
import { UserEntity } from '../user/user.entity';
import { CreatePdfDto } from './dto/create-revision-share.dto';

@Controller('revision-share')
export class RevisionController {
  constructor(private readonly revisionService: RevisionService) {}

  @Post('/kontragent')
  @Roles(USER_ROLE.ADMIN)
  @UseGuards(AuthGuard(), AccountGuard)
  createKontragent(
    @Body() body: CreatePdfDto,
    @Res() res,
    @GetAccount() user: UserEntity,
  ) {
    this.revisionService.createKontragent(user, body, res);
  }

  @Post('/self')
  @Roles(USER_ROLE.ADMIN)
  @UseGuards(AuthGuard(), AccountGuard)
  createSelf(
    @Body() body: CreatePdfDto,
    @Res() res,
    @GetAccount() user: UserEntity,
  ) {
    this.revisionService.createSelf(user, body, res);
  }
}
