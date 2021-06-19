import { Injectable, BadRequestException } from '@nestjs/common';
import { UserEntity } from '../user/user.entity';
import { UserSettingsUpdatePasswordDto } from './dto/user-settings-update-password.dto';
import { UserSettingsUpdateEmailDto } from './dto/user-settings-update-email.dto';
import { UserSettingsUpdatePhoneDto } from './dto/user-settings-update-phone.dto';

@Injectable()
export class UserSettingsService {
  async updatePassword(
    user: UserEntity,
    userSettingsUpdatePasswordDto: UserSettingsUpdatePasswordDto,
  ): Promise<void> {
    const { newPassword } = userSettingsUpdatePasswordDto;
    user.updatePassword(newPassword);
    try {
      await user.save();
    } catch {
      throw new BadRequestException();
    }
  }

  async updateEmail(
    user: UserEntity,
    userSettingsUpdateEmailDto: UserSettingsUpdateEmailDto,
  ): Promise<void> {
    const { email } = userSettingsUpdateEmailDto;
    user.email = email;
    try {
      await user.save();
    } catch {
      throw new BadRequestException();
    }
  }

  async updatePhone(
    user: UserEntity,
    userSettingsUpdatePhoneDto: UserSettingsUpdatePhoneDto,
  ): Promise<void> {
    const { phone } = userSettingsUpdatePhoneDto;
    user.phone = phone;
    try {
      await user.save();
    } catch {
      throw new BadRequestException();
    }
  }
}
