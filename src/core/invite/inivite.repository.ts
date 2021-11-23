import { Repository, EntityRepository } from 'typeorm';
import {  InviteEntity } from './invite.entity';
import { InviteDto } from './dto/invite.dto';
import {  BadRequestException } from '@nestjs/common';
import {INVITE_ERROR} from './enum/invite-error.enum'

@EntityRepository(InviteEntity)
export class InviteRepository extends Repository<InviteEntity> {

    async invite(inviteDto: InviteDto ): Promise <void> {
        const {email} = inviteDto

        const invited: InviteEntity = new InviteEntity();
        invited.email = email;
        try {
            await invited.save();
           
          } catch (error) {
            throw new BadRequestException(INVITE_ERROR.ALLREARY_INVITED);
          }
    }

}
