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
import { randomUUID } from 'src/common/utils/hash';
import { USER_VERIFICATION_ERROR } from './enum/user-verification-error.enum';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from '../user/user.repository';

@Injectable()
export class UserVerificationService {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {}

  async getEmailVerificationCode(user: UserEntity): Promise<void> {
    if (user.confirmEmail) {
      throw new BadRequestException(
        USER_VERIFICATION_ERROR.USER_USER_VERIFICATION_EMAIL_ALLDREADY_CONFIRM,
      );
    }

    const userVerificationEmailPayload: UserVerificationEmailPayload = {
      email: user.email,
      userId: user.id,
    };

    const code = randomUUID();

    await this.cacheManager.set(
      code,
      JSON.stringify(userVerificationEmailPayload),
    );

    console.log(code);
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

    const code = randomUUID();

    await this.cacheManager.set(
      code,
      JSON.stringify(userVerificationPhonePayload),
    );

    console.log(`PHONE CODE: ${code}`);
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
}
