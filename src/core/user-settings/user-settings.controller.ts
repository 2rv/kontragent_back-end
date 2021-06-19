import {
  Controller,
  Patch,
  UseGuards,
  Body,
  ValidationPipe,
} from '@nestjs/common';
import { UserSettingsService } from './user-settings.service';
import { AuthGuard } from '@nestjs/passport';
import { AccountGuard } from '../user/guard/account.guard';
import { GetAccount } from '../user/decorator/get-account.decorator';
import { UserEntity } from '../user/user.entity';
import { UserSettingsUpdatePasswordDto } from './dto/user-settings-update-password.dto';
import { UserSettingsUpdateEmailDto } from './dto/user-settings-update-email.dto';
import { UserSettingsUpdatePhoneDto } from './dto/user-settings-update-phone.dto';
import { PasswordGuard } from './guard/password.guard';

@Controller('user/settings')
export class UserSettingsController {
  constructor(private userSettingsService: UserSettingsService) {}

  @Patch('/password')
  @UseGuards(AuthGuard(), AccountGuard, PasswordGuard)
  updatePassword(
    @Body(ValidationPipe)
    userSettingsUpdatePasswordDto: UserSettingsUpdatePasswordDto,
    @GetAccount() user: UserEntity,
  ): Promise<void> {
    return this.userSettingsService.updatePassword(
      user,
      userSettingsUpdatePasswordDto,
    );
  }

  @Patch('/email')
  @UseGuards(AuthGuard(), AccountGuard, PasswordGuard)
  updateEmail(
    @Body(ValidationPipe)
    userSettingsUpdateEmailDto: UserSettingsUpdateEmailDto,
    @GetAccount() user: UserEntity,
  ): Promise<void> {
    return this.userSettingsService.updateEmail(
      user,
      userSettingsUpdateEmailDto,
    );
  }

  @Patch('/phone')
  @UseGuards(AuthGuard(), AccountGuard, PasswordGuard)
  updatePhone(
    @Body(ValidationPipe)
    userSettingsUpdatePhoneDto: UserSettingsUpdatePhoneDto,
    @GetAccount() user: UserEntity,
  ): Promise<void> {
    return this.userSettingsService.updatePhone(
      user,
      userSettingsUpdatePhoneDto,
    );
  }
}
