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

import { CompanyRepository } from '../company/company.repository';

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
    private mailService: MailService,
  ) {}

  async sendReferalMemberLink(
    user: UserEntity,
    sendReferalMemberLinkDto: SendReferalMemberLinkDto,
  ): Promise<void> {
    //DETERMINE WHETHER USER REGISTERED OR NOT TO SEND APPROPRIATE MAIL
    const invitedUser = await this.userRepository.findOne({
      where: { email: sendReferalMemberLinkDto.email },
    });
    if (invitedUser) {

      const invitedUserCompany =
        await this.companyRepository.getCompanyListByUser(invitedUser);
  
       const invitedUserCompanyIdList = invitedUserCompany.map((company) => {
        return company.id
       })

      const commonCompany = await this.companyRepository.createQueryBuilder('company')
      .leftJoin('company.companyMember', 'companyMember')
      .leftJoin('companyMember.user', 'user')
      .where("company.id IN (:...ids)", { ids: invitedUserCompanyIdList })
      .andWhere("user.id = :id", { id: user.id })
      .getOne()

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

    //DETERMINE WHETHER REGISTERED USER ALLOW TO BECOME REFERAL MEMBER
    // const commonCompanyQuery = this.companyRepository
    //   .createQueryBuilder('company')
    //   .leftJoin('company.companyMember', 'companyMember')
    //   .leftJoin('companyMember.user', 'user');
    // const commonCompany = await commonCompanyQuery.getOne();
    // console.log(`COMMON COMPANY: ${commonCompany}`);

    //GET REFERAL ENTITY TO REPRESENT REFERAL INFORMATION TO REFERAL
    const referalQuery = this.referalRepository.createQueryBuilder('referal');
    referalQuery.leftJoinAndSelect('referal.user', 'user');
    referalQuery.where('user.id = :id', { id: user.id });
    const referal = await referalQuery.getOne();
    console.log(`REFERAL: ${JSON.stringify(referal)}`);

    invitedUser
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
    //ПРОВЕРКА НA ПРИГЛАШ. САМОГО СЕБЯ

    const query = this.userRepository
      .createQueryBuilder('user')
      .leftJoin('user.referal', 'referal')
      .where('referal.id = :id', { id: referal.id });
    const referalUser = await query.getOne();

    const referalUserCompany =
      await this.companyRepository.getCompanyListByUser(referalUser);

    const referalUserCompanyIdList = referalUserCompany.map((company) => {
      return company.id
      })

    const commonCompany = await this.companyRepository.createQueryBuilder('company')
    .leftJoin('company.companyMember', 'companyMember')
    .leftJoin('companyMember.user', 'user')
    .where("company.id IN (:...ids)", { ids: referalUserCompanyIdList })
    .andWhere("user.id = :id", { id: user.id })
    .getOne()

    if (commonCompany)
    throw new BadRequestException(
      REFERAL_MEMBER_ERROR.USER_IS_MEMBER_OF_YOUR_COMPANY,
    );

    //VALIDATE WHETHER USER HAS REFERAL MEMBER
    const referalMember =
      await this.referalMemberRepository.getReferalMemberByUser(user);

    if (referalMember)
      throw new BadRequestException(
        REFERAL_MEMBER_ERROR.USER_ALREADY_REFERAL_MEMBER,
      );

    return await this.referalMemberRepository.createReferalMember(
      referal,
      user,
    );
  }
}
