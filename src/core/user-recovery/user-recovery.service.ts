import { Cache } from 'cache-manager';
import {
  BadRequestException,
  CACHE_MANAGER,
  Inject,
  Injectable,
} from '@nestjs/common';
import { UserRecoveryPasswordPayload } from './type/user-recovery-password.type';
import { randomUUID } from 'src/common/utils/hash';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from '../user/user.repository';
import { UserEmailCodeDto } from './dto/user-email-code.dto';
import { UserRecoveryChangePasswordDto } from './dto/user-recovery-change-password.dto';
import { AUTH_ERROR } from '../auth/enum/auth-error.enum';
import { USER_RECOVERY_ERROR } from '../user-recovery/enum/user-recovery-error.enum';

@Injectable()
export class UserRecoveryService {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {}

  async getEmailRecoveryCode(
    userEmailCodeDto: UserEmailCodeDto,
  ): Promise<void> {
    const { email } = userEmailCodeDto;

    const user = await this.userRepository.findOne({
      where: [{ email: email }],
    });

    if (!user) {
      throw new BadRequestException(AUTH_ERROR.COULDNT_FOUND_USER);
    }

    const userRecoveryPasswordPayload: UserRecoveryPasswordPayload = {
      id: user.id,
    };

    const code = randomUUID();

    await this.cacheManager.set(
      code,
      JSON.stringify(userRecoveryPasswordPayload),
    );

    console.log(code);
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
