import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../user/user.entity';
import { UserRepository } from '../user/user.repository';
import { UserSettingsUpdatePasswordDto } from './dto/user-settings-update-password.dto';
import { UserSettingsUpdateEmailDto } from './dto/user-settings-update-email.dto';

@Injectable()
export class UserSettingsService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {}
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
    await user.save();
  }
}
