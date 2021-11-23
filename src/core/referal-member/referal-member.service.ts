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
import { REFERAL_MEMBER_ERROR } from './enum/referal-member-enum';
import { USER_ROLE } from '../user/enum/user-role.enum';
import { CompanyRepository } from '../company/company.repository';
import { REFERAL_ACHIEVEMENT_TYPE } from '../referal-achievement/enum/referal-achievement-type.enum';
import { ReferalAchievementService } from '../referal-achievement/referal-achievement.service';
import { TwilioSendSMS } from '../../common/utils/twilio';

@Injectable()
export class ReferalMemberService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    @InjectRepository(ReferalRepository)
    private referalRepository: ReferalRepository,
    @InjectRepository(ReferalMemberRepository)
    private referalMemberRepository: ReferalMemberRepository,
    @InjectRepository(CompanyRepository)
    private companyRepository: CompanyRepository,
    private referalAchievementService: ReferalAchievementService,
    private mailService: MailService,
  ) {}

  async sendReferalMemberLink(
    user: UserEntity,
    sendReferalMemberLinkDto: SendReferalMemberLinkDto,
  ): Promise<void> {
    //DETERMINE WHETHER USER REGISTERED OR NOT TO SEND APPROPRIATE MAIL
    const invitedUser = await this.userRepository.findOne({
      where: [
        { email: sendReferalMemberLinkDto.credential },
        { phone: sendReferalMemberLinkDto.credential },
      ],
    });

    if (invitedUser) {
      //ПРОВЕРКА НA  ПРИГЛАШ. САМОГО СЕБЯ
      if (invitedUser.id === user.id)
        throw new BadRequestException(
          REFERAL_MEMBER_ERROR.CANNOT_ADD_YOURSELF_AS_REFERAL_MEMEBER,
        );

      //ПРОВЕРКА НА АДМИНА
      if (invitedUser.role === USER_ROLE.ADMIN)
        throw new BadRequestException(
          REFERAL_MEMBER_ERROR.CANNOT_ADD_ROLE_ADMIN,
        );

      //ПРОВЕРКА НА СОТРУДНИКА КОМПАНИИ
      const invitedUserCompany =
        await this.companyRepository.getCompanyListByUser(invitedUser);

      const invitedUserCompanyIdList = invitedUserCompany.map((company) => {
        return company.id;
      });

      const commonCompany = invitedUserCompanyIdList.length
        ? await this.companyRepository
            .createQueryBuilder('company')
            .leftJoin('company.companyMember', 'companyMember')
            .leftJoin('companyMember.user', 'user')
            .where('company.id IN (:...ids)', { ids: invitedUserCompanyIdList })
            .andWhere('user.id = :id', { id: user.id })
            .getOne()
        : false;

      if (commonCompany)
        throw new BadRequestException(
          REFERAL_MEMBER_ERROR.USER_IS_MEMBER_OF_YOUR_COMPANY,
        );
    }

    //VALIDATE WHETHER USER HAS REFERAL MEMBER
    const referalMember = invitedUser
      ? await this.referalMemberRepository.getReferalMemberByUser(invitedUser)
      : false;

    if (referalMember)
      throw new BadRequestException(
        REFERAL_MEMBER_ERROR.USER_ALREADY_REFERAL_MEMBER,
      );

    //GET REFERAL ENTITY TO REPRESENT REFERAL INFORMATION TO REFERAL
    const referalQuery = this.referalRepository.createQueryBuilder('referal');
    referalQuery.leftJoinAndSelect('referal.user', 'user');
    referalQuery.where('user.id = :id', { id: user.id });
    const referal = await referalQuery.getOne();

    if (invitedUser) {
      if (sendReferalMemberLinkDto.credential.indexOf('@') > 0) {
        this.mailService.sendReferralLinkEmailToRegisteredUser(
          sendReferalMemberLinkDto,
          referal,
        );
      } else {
        TwilioSendSMS(
          `${referal.user.firstname} ${referal.user.lastname} приглашает Вас!`,
          sendReferalMemberLinkDto.credential,
        );
      }
    } else {
      if (sendReferalMemberLinkDto.credential.indexOf('@') > 0) {
        this.mailService.sendReferralLinkEmailToNotRegisteredUser(
          sendReferalMemberLinkDto,
          referal,
        );
      } else {
        TwilioSendSMS(
          `${referal.user.firstname} ${referal.user.lastname} приглашает Вас!`,
          sendReferalMemberLinkDto.credential,
        );
      }
    }
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
    const query = this.userRepository
      .createQueryBuilder('user')
      .leftJoin('user.referal', 'referal')
      .where('referal.id = :id', { id: referal.id });
    const referalUser = await query.getOne();
    //ПРОВЕРКА НA  ПРИГЛАШ. САМОГО СЕБЯ
    if (referalUser.id === user.id)
      throw new BadRequestException(
        REFERAL_MEMBER_ERROR.CANNOT_ADD_YOURSELF_AS_REFERAL_MEMEBER,
      );

    //ПРОВЕРКА НА АДМИНА
    if (user.role === USER_ROLE.ADMIN)
      throw new BadRequestException(REFERAL_MEMBER_ERROR.CANNOT_JOIN_AS_ADMIN);

    //ПРОВЕРКА НА СОТРУДНИКА КОМПАНИИ
    const referalUserCompany =
      await this.companyRepository.getCompanyListByUser(referalUser);

    const referalUserCompanyIdList = referalUserCompany.map((company) => {
      return company.id;
    });

    const commonCompany = referalUserCompanyIdList.length
      ? await this.companyRepository
          .createQueryBuilder('company')
          .leftJoin('company.companyMember', 'companyMember')
          .leftJoin('companyMember.user', 'user')
          .where('company.id IN (:...ids)', { ids: referalUserCompanyIdList })
          .andWhere('user.id = :id', { id: user.id })
          .getOne()
      : false;

    if (commonCompany)
      throw new BadRequestException(
        REFERAL_MEMBER_ERROR.REFERAL_IS_MEMBER_OF_YOUR_COMPANY,
      );

    //VALIDATE WHETHER USER HAS REFERAL MEMBER
    const referalMember =
      await this.referalMemberRepository.getReferalMemberByUser(user);

    if (referalMember)
      throw new BadRequestException(
        REFERAL_MEMBER_ERROR.YOU_ALREADT_REFERAL_MEMBER,
      );

    const newReferalMember =
      await this.referalMemberRepository.createReferalMember(referal, user);

    await this.referalAchievementService.createReferalAchievement(
      1500,
      REFERAL_ACHIEVEMENT_TYPE.SIGNUP,
      newReferalMember,
    );

    return newReferalMember;
  }
}
