import { Controller, Get, UseGuards, Post } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetAccount } from '../user/decorator/get-account.decorator';
import { AccountGuard } from '../user/guard/account.guard';
import { UserEntity } from '../user/user.entity';
import { UserService } from './user.service';
import { UserGetAccountEmailDto } from './dto/user-get-account-email.dto';
import { UserGetAccountPhoneDto } from './dto/user-get-account-phone.dto';

@Controller('user/account')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('/email')
  @UseGuards(AuthGuard(), AccountGuard)
  getAccountEmail(
    @GetAccount() user: UserEntity,
  ): Promise<UserGetAccountEmailDto> {
    return this.userService.getAccountEmail(user);
  }

  @Get('/phone')
  @UseGuards(AuthGuard(), AccountGuard)
  getAccountPhone(
    @GetAccount() user: UserEntity,
  ): Promise<UserGetAccountPhoneDto> {
    return this.userService.getAccountPhone(user);
  }
}
