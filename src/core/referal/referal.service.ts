import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { ReferalRepository } from '../referal/referal.repository';
import { ReferalEntity } from '../referal/referal.entity';
import { UserEntity } from '../user/user.entity';

@Injectable()
export class ReferalService {
  constructor(
    @InjectRepository(ReferalRepository)
    private referalRepository: ReferalRepository,
  ) {}

  async getUserReferalInfoByUser(user: UserEntity): Promise<ReferalEntity> {
    return await this.referalRepository.getReferalInfoByUser(user);
  }
}
