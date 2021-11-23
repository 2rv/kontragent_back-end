import { InjectRepository } from '@nestjs/typeorm';
import {InviteDto} from './dto/invite.dto'
import {InviteRepository} from './inivite.repository'
import {InviteEntity} from './invite.entity'
import { Injectable } from '@nestjs/common';

@Injectable()
export class InviteServise{

    constructor(
        @InjectRepository(InviteRepository)
        private iniviteRepository: InviteRepository
    ) {}

    async invite(inviteDto: InviteDto): Promise<void> {
        await this.iniviteRepository.invite(
            inviteDto
        )
        
    }

}

