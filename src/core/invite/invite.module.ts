import {  Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InviteRepository } from './inivite.repository';
import { InviteController } from './invite.controller';
import {InviteEntity} from './invite.entity'
import { InviteServise } from './invite.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            InviteEntity,
            InviteRepository
        ])
    ],

    controllers: [InviteController],
    providers: [InviteServise],
    exports: [InviteServise]
})

export class InviteModule {}
