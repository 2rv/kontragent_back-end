import { Cache } from 'cache-manager';
import {
  BadRequestException,
  CACHE_MANAGER,
  Inject,
  Injectable,
} from '@nestjs/common';
import { UserEntity } from '../user/user.entity';
import { UserVerificationPhonePayload } from './type/user-verification-phone-payload.type';
import { UserVerificationEmailPayload } from './type/user-verification-email-payload.type';
import { randomNumberCode } from 'src/common/utils/hash';
import { USER_VERIFICATION_ERROR } from './enum/user-verification-error.enum';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from '../user/user.repository';
import { MailService } from '../mail/mail.service';
import { sendCodeSMS } from 'src/common/utils/sms';

import { ReferalMemberService } from '../referal-member/referal-member.service';

import { ReferalEntity } from '../referal/referal.entity';

@Injectable()
export class UserVerificationService {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private referalMemberService: ReferalMemberService,
    private mailService: MailService,
  ) {}

  async getEmailVerificationCode(user: UserEntity): Promise<void> {
    if (user.confirmEmail) {
      throw new BadRequestException(
        USER_VERIFICATION_ERROR.USER_USER_VERIFICATION_EMAIL_ALLREADY_CONFIRM,
      );
    }

    const userVerificationEmailPayload: UserVerificationEmailPayload = {
      email: user.email,
      userId: user.id,
    };

    const code = randomNumberCode();

    console.log(`EMAIL VERIFICATION CODE: ${code}`);

    await this.cacheManager.set(
      code,
      JSON.stringify(userVerificationEmailPayload),
    );

    this.mailService.sendUserVerificationCodeEmail(user.email, code);
  }

  async confirmUserVerificationEmail(code: string): Promise<void> {
    const rawUserVerificationEmailPayload = await this.cacheManager.get(code);

    if (!rawUserVerificationEmailPayload) {
      throw new BadRequestException(
        USER_VERIFICATION_ERROR.USER_USER_VERIFICATION_EMAIL_UNCORRECT_CODE,
      );
    }

    const userVerificationEmailPayload: UserVerificationEmailPayload =
      JSON.parse(rawUserVerificationEmailPayload);

    await this.userRepository.confirmEmailById(
      userVerificationEmailPayload.userId,
    );

    this.cacheManager.del(code);
  }

  async getPhoneVerificationCode(user: UserEntity): Promise<void> {
    if (user.confirmPhone) {
      throw new BadRequestException(
        USER_VERIFICATION_ERROR.USER_USER_VERIFICATION_PHONE_ALLREADY_CONFIRM,
      );
    }

    const userVerificationPhonePayload: UserVerificationPhonePayload = {
      phone: user.phone,
      userId: user.id,
    };

    const code = randomNumberCode();
    console.log(`PHONE VERIFICATION CODE: ${code}`);

    await this.cacheManager.set(
      code,
      JSON.stringify(userVerificationPhonePayload),
    );

    sendCodeSMS(code, user.phone);
  }

  async confirmUserVerificationPhone(code: string): Promise<void> {
    const rawUserVerificationPhonePayload = await this.cacheManager.get(code);

    if (!rawUserVerificationPhonePayload) {
      throw new BadRequestException(
        USER_VERIFICATION_ERROR.USER_USER_VERIFICATION_PHONE_UNCORRECT_CODE,
      );
    }

    const userVerificationPhonePayload: UserVerificationPhonePayload =
      JSON.parse(rawUserVerificationPhonePayload);

    await this.userRepository.confirmPhoneById(
      userVerificationPhonePayload.userId,
    );

    this.cacheManager.del(code);
  }

  async confirmUserVerificationPhoneWithReferal(
    code: string,
    referal: ReferalEntity,
    user: UserEntity,
  ): Promise<void> {
    const rawUserVerificationPhonePayload = await this.cacheManager.get(code);

    if (!rawUserVerificationPhonePayload) {
      throw new BadRequestException(
        USER_VERIFICATION_ERROR.USER_USER_VERIFICATION_PHONE_UNCORRECT_CODE,
      );
    }

    const userVerificationPhonePayload: UserVerificationPhonePayload =
      JSON.parse(rawUserVerificationPhonePayload);
    await this.userRepository.confirmPhoneById(
      userVerificationPhonePayload.userId,
    );
    this.cacheManager.del(code);

    this.referalMemberService.createReferalMember(referal, user);
  }
}
