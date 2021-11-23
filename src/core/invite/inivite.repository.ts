import { Repository, EntityRepository } from 'typeorm';
import {  InviteEntity } from './invite.entity';
import { InviteDto } from './dto/invite.dto';

@EntityRepository(InviteEntity)
export class InviteRepository extends Repository<InviteEntity> {

    async invite(inviteDto: InviteDto ): Promise <void> {
        const {email} = inviteDto

        const invited: InviteEntity = new InviteEntity();
        invited.email = email;
         await invited.save();
    }

}
