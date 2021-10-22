import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { MailService } from '../mail/mail.service';
import { ReferalRepository } from '../referal/referal.repository';
import { SendReferalMemberLinkDto } from './dto/send-referal-member-link.dto';
import { UserRepository } from '../user/user.repository';
import { UserEntity } from '../user/user.entity';
import { ReferalEntity } from '../referal/referal.entity';
import { ReferalMemberEntity } from './referal-member.entity';
import { ReferalMemberRepository } from './referal-member.repository';

@Injectable()
export class ReferalMemberService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    @InjectRepository(ReferalRepository)
    private referalRepository: ReferalRepository,
    @InjectRepository(ReferalMemberRepository)
    private referalMemberRepository: ReferalMemberRepository,
    private mailService: MailService,
  ) {}

  async sendReferalMemberLink(
    user: UserEntity,
    sendReferalMemberLinkDto: SendReferalMemberLinkDto,
  ): Promise<void> {
    //DETERMINE WHETHER USER REGISTERED OR NOT TO SEND APPROPRIATE MAIL
    const registered = await this.userRepository.findOne({
      where: { email: sendReferalMemberLinkDto.email },
    });

    //DETERMINE WHETHER REGISTERED USER ALLOW TO BECOME REFERAL MEMBER
    const NotAllowedReferral = false;
    if (NotAllowedReferral) throw new BadRequestException();

    //GET REFERAL ENTITY TO REPRESENT REFERAL INFORMATION TO REFERAL
    const referalQuery = this.referalRepository.createQueryBuilder('referal');
    referalQuery.leftJoinAndSelect('referal.user', 'user');
    referalQuery.where('user.id = :id', { id: user.id });
    const referal = await referalQuery.getOne();
    console.log(`REFERAL: ${JSON.stringify(referal)}`);

    registered
      ? this.mailService.sendReferralLinkEmailToRegisteredUser(
          sendReferalMemberLinkDto,
          referal,
        )
      : this.mailService.sendReferralLinkEmailToNotRegisteredUser(
          sendReferalMemberLinkDto,
          referal,
        );
  }

  async getUserReferalMemberList(
    user: UserEntity,
  ): Promise<ReferalMemberEntity[]> {
    return await this.referalMemberRepository.getReferalMemberList(user);
  }

  async createReferalMember(
    referal: ReferalEntity,
    user: UserEntity,
  ): Promise<ReferalMemberEntity> {
    return await this.referalMemberRepository.createReferalMember(
      referal,
      user,
    );
  }
}
