import { Controller, Post, UseGuards, Body, Res } from '@nestjs/common';
import { RevisionService } from './revision-share.service';
import { AuthGuard } from '@nestjs/passport';
import { AccountGuard } from '../user/guard/account.guard';
import { Roles } from '../user/decorator/role.decorator';
import { USER_ROLE } from '../user/enum/user-role.enum';
import { GetAccount } from '../user/decorator/get-account.decorator';
import { UserEntity } from '../user/user.entity';
import { CreatePdfDto } from './dto/create-revision-share.dto';
import { RevisionGuard } from '../revision/guard/revision.guard';
import { RevisionEntity } from '../revision/revision.entity';
import { GetRevision } from '../revision/decorator/get-revision.decorator';
import { GetRevisionSelf } from '../revision-self/decorator/get-revision-self.decorator';
import { RevisionSelfEntity } from '../revision-self/revision-self.entity';
import { RevisionSelfGuard } from '../revision-self/guard/revision-self.guard';

@Controller('revision-share')
export class RevisionController {
  constructor(private readonly revisionService: RevisionService) {}

  @Post('/kontragent/:revisionId')
  @Roles(USER_ROLE.ADMIN)
  @UseGuards(AuthGuard(), AccountGuard, RevisionGuard)
  createKontragent(
    @GetAccount() user: UserEntity,
    @GetRevision() revision: RevisionEntity,
    @Body() body: CreatePdfDto,
  ): Promise<void> {
    return this.revisionService.createKontragent(user, revision, body);
  }

  @Post('/self/:revisionSelfId')
  @Roles(USER_ROLE.ADMIN)
  @UseGuards(AuthGuard(), AccountGuard, RevisionSelfGuard)
  createSelf(
    @GetAccount() user: UserEntity,
    @GetRevisionSelf() revisionSelf: RevisionSelfEntity,
    @Body() body: CreatePdfDto,
  ): Promise<void> {
    return this.revisionService.createSelf(user, revisionSelf, body);
  }
}
