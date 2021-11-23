import {
  Body,
  Controller,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';

import { AuthGuard } from '@nestjs/passport';
import { AccountGuard } from '../user/guard/account.guard';
import { InviteService } from './invite.service';

import { InviteDto } from './dto/invite.dto';

@Controller('invite')
export class InviteController {
  constructor(private inviteService: InviteService) {}

  @Post('/admin')
  @UseGuards(AuthGuard(), AccountGuard)
  sendInvite(
    @Body(ValidationPipe) emails: Array<string>,
  ): Promise<void> {
    return this.inviteService.sendInvite(emails);
  }

  @Post('/')
  async invite(@Body(ValidationPipe) inviteDto: InviteDto): Promise<void> {
    return this.inviteService.invite(inviteDto);
  }
}
