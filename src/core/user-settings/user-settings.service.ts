import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../user/user.entity';
import { UserRepository } from '../user/user.repository';
import {
  UserSettingsUpdatePasswordDto,
  UserSettingsUpdateEmailDto,
} from './dto/user-settings-update-password.dto';

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
    await user.save();
  }

  async updateEmail(
    user: UserEntity,
    userSettingsUpdateEmailDto: UserSettingsUpdateEmailDto,
  ): Promise<void> {
    const { email } = userSettingsUpdateEmailDto;
    user.updateEmail(email);
    await user.save();
  }
}
