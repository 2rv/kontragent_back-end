import {
    Controller,
    Post,
    Body,
    ValidationPipe,
  } from '@nestjs/common';
import {InviteDto} from './dto/invite.dto'
import {InviteServise} from './invite.service'

@Controller('invite')
export class InviteController {

    constructor(private inviteService: InviteServise) {}

    @Post('/')
    async invite(
        @Body(ValidationPipe) inviteDto: InviteDto
    ): Promise<void> {
        return this.inviteService.invite(inviteDto)
    }

}