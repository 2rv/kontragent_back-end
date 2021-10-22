import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { MailService } from '../mail/mail.service';
import { ReferrerRepository } from '../referrer/referrer.repository';
import { SendReferralLinkDto } from './dto/send-referral-link.dto';
import { UserRepository } from '../user/user.repository';
import { UserEntity } from '../user/user.entity';
import { ReferrerEntity } from '../referrer/referrer.entity';
import { ReferralEntity } from './referral.entity';
import { ReferralRepository } from './referral.repository';

@Injectable()
export class ReferralService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    @InjectRepository(ReferrerRepository)
    private referrerRepository: ReferrerRepository,
    @InjectRepository(ReferralRepository)
    private referralRepository: ReferralRepository,
    private mailService: MailService,
  ) {}

  async sendReferralLink(
    user: UserEntity,
    sendReferralLinkDto: SendReferralLinkDto,
  ): Promise<void> {
    //DETERMINE WHETHER USER REGISTERED OR NOT TO SEND APPROPRIATE MAIL
    const registered = await this.userRepository.findOne({
      where: { email: sendReferralLinkDto.email },
    });

    //DETERMINE WHETHER REGISTERED USER ALLOW TO BECOME REFERRAL
    const NotAllowedReferral = false;
    if (NotAllowedReferral) throw new BadRequestException();

    //GET REFERRER ENTITY TO REPRESENT REFERRER INFORMATION TO REFERRAL
    const referrerQuery =
      this.referrerRepository.createQueryBuilder('referrer');
    referrerQuery.leftJoinAndSelect('referrer.user', 'user');
    referrerQuery.where('user.id = :id', { id: user.id });
    const referrer = await referrerQuery.getOne();
    console.log(`REFERRER: ${JSON.stringify(referrer)}`);

    registered
      ? this.mailService.sendReferralLinkEmailToRegisteredUser(
          sendReferralLinkDto,
          referrer,
        )
      : this.mailService.sendReferralLinkEmailToNotRegisteredUser(
          sendReferralLinkDto,
          referrer,
        );
  }

  async createReferral(
    referrer: ReferrerEntity,
    user: UserEntity,
  ): Promise<ReferralEntity> {
    return await this.referralRepository.createReferral(referrer, user);
  }
}
