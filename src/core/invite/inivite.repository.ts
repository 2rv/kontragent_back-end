import { Repository, EntityRepository } from 'typeorm';
import { InviteEntity } from './invite.entity';
import { InviteDto } from './dto/invite.dto';
import { BadRequestException } from '@nestjs/common';
import { INVITE_ERROR } from './enum/invite-error.enum';

@EntityRepository(InviteEntity)
export class InviteRepository extends Repository<InviteEntity> {
  async invite(inviteDto: InviteDto): Promise<void> {
    const { email } = inviteDto;

    const invite: InviteEntity = new InviteEntity();
    invite.email = email;
    try {
      await invite.save();
    } catch (error) {
      throw new BadRequestException(INVITE_ERROR.ALLREARY_INVITED);
    }
  }
}
