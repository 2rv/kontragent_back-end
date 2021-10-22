import { Repository, EntityRepository } from 'typeorm';
import { ReferalMemberEntity } from './referal-member.entity';
import { ReferalEntity } from '../referal/referal.entity';
import { UserEntity } from '../user/user.entity';

import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';

@EntityRepository(ReferalMemberEntity)
export class ReferalMemberRepository extends Repository<ReferalMemberEntity> {
  async createReferalMember(
    referalEntity: ReferalEntity,
    user: UserEntity,
  ): Promise<ReferalMemberEntity> {
    const referalMemberEntity: ReferalMemberEntity = new ReferalMemberEntity();
    referalMemberEntity.referal = referalEntity;
    referalMemberEntity.user = user;
    try {
      await referalMemberEntity.save();
      return referalMemberEntity;
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException();
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
