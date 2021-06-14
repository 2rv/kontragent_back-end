import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { UserRecoveryService } from './user-recovery.service';
import { UserEmailCodeDto } from './dto/user-email-code.dto';
import { UserRecoveryChangePasswordDto } from './dto/user-recovery-change-password.dto';

@Controller('user/recovery')
export class UserRecoveryController {
  constructor(private userRecoveryService: UserRecoveryService) {}

  @Post('/email')
  getEmailCode(
    @Body(ValidationPipe) userEmailCodeDto: UserEmailCodeDto,
  ): Promise<void> {
    return this.userRecoveryService.getEmailRecoveryCode(userEmailCodeDto);
  }

  @Post('/change-password')
  changeUserPassword(
    @Body(ValidationPipe)
    userRecoveryChangePasswordDto: UserRecoveryChangePasswordDto,
  ): Promise<void> {
    return this.userRecoveryService.updateUserPassoword(
      userRecoveryChangePasswordDto,
    );
  }
}
