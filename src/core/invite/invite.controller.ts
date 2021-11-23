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

import { InviteEmailsDto } from './invite-emails.dto';
import { InviteDto } from './dto/invite.dto';

@Controller('invite')
export class InviteController {
  constructor(private inviteService: InviteService) {}

  @Post('/admin')
  @UseGuards(AuthGuard(), AccountGuard)
  sendInvite(
    @Body(ValidationPipe) inviteEmailsDto: InviteEmailsDto,
  ): Promise<void> {
    return this.inviteService.sendInvite(inviteEmailsDto);
  }

  @Post('/')
  async invite(@Body(ValidationPipe) inviteDto: InviteDto): Promise<void> {
    return this.inviteService.invite(inviteDto);
  }
}
