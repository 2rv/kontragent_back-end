import { Cache } from 'cache-manager';
import {
  BadRequestException,
  CACHE_MANAGER,
  Inject,
  Injectable,
} from '@nestjs/common';
import { UserRecoveryPasswordPayload } from './type/user-recovery-password.type';
import { randomNumberCode, randomUUID } from 'src/common/utils/hash';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from '../user/user.repository';
import { UserRecoveryGetEmailCodeDto } from './dto/user-email-code.dto';
import { UserRecoveryChangePasswordDto } from './dto/user-recovery-change-password.dto';
import { USER_RECOVERY_ERROR } from '../user-recovery/enum/user-recovery-error.enum';
import { MailService } from '../mail/mail.service';

@Injectable()
export class UserRecoveryService {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private mailService: MailService,
  ) {}

  async getEmailRecoveryCode(
    userRecoveryGetEmailCodeDto: UserRecoveryGetEmailCodeDto,
  ): Promise<void> {
    const { email } = userRecoveryGetEmailCodeDto;

    const user = await this.userRepository.findOne({
      where: [{ email: email }],
    });

    if (!user) {
      throw new BadRequestException(
        USER_RECOVERY_ERROR.USER_WITH_THIS_EMAIL_NOT_FOUND,
      );
    }

    const userRecoveryPasswordPayload: UserRecoveryPasswordPayload = {
      id: user.id,
    };

    const code = randomNumberCode();
    console.log('recovery: ', code);

    await this.cacheManager.set(
      code,
      JSON.stringify(userRecoveryPasswordPayload),
    );

    this.mailService.sendUserVerificationCodeEmail(user.email, code);
  }

  async updateUserPassword(
    userRecoveryChangePasswordDto: UserRecoveryChangePasswordDto,
  ): Promise<void> {
    const { code, password } = userRecoveryChangePasswordDto;

    const rawUserRecoveryPasswordPayload = await this.cacheManager.get(code);

    if (!rawUserRecoveryPasswordPayload) {
      throw new BadRequestException(
        USER_RECOVERY_ERROR.USER_RECOVERY_PASSWORD_INCORRECT_CODE,
      );
    }

    const userRecoveryPasswordPayload: UserRecoveryPasswordPayload = JSON.parse(
      rawUserRecoveryPasswordPayload,
    );

    const user = await this.userRepository.findOne({
      where: [{ id: userRecoveryPasswordPayload.id }],
    });

    user.updatePassword(password);
    await user.save();

    this.cacheManager.del(code);
  }
}
