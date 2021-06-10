import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../user/user.entity';
import { UserRepository } from '../user/user.repository';
import { UserSettingsUpdatePasswordDto } from './dto/user-settings-update-password.dto';

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
}
