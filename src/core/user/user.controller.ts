import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetAccount } from '../user/decorator/get-account.decorator';
import { AccountGuard } from '../user/guard/account.guard';
import { UserEntity } from '../user/user.entity';
import { UserService } from './user.service';
import { UserGetAccountEmailDto } from './dto/user-get-account-email.dto';
import { UserGuard } from './guard/user.guard';
import { Roles } from './decorator/role.decorator';
import { USER_ROLE } from './enum/user-role.enum';
import { GetUser } from './decorator/get-user.decorator';
import { UserGetAccountDataDto, UserGetAccountAllDataDto } from './dto/user-get-account-data.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('/account/email')
  @UseGuards(AuthGuard(), AccountGuard)
  getAccountEmail(
    @GetAccount() user: UserEntity,
  ): Promise<UserGetAccountEmailDto> {
    return this.userService.getAccountEmail(user);
  }

  @Get('/admin/:userId')
  @Roles(USER_ROLE.ADMIN)
  @UseGuards(AuthGuard(), AccountGuard, UserGuard)
  getUserData(@GetUser() user: UserEntity): Promise<UserGetAccountDataDto> {
    return this.userService.getUserData(user);
  }

  @Get('/admin')
  @Roles(USER_ROLE.ADMIN)
  @UseGuards(AuthGuard(), AccountGuard)
  getAdminUserList(): Promise<UserGetAccountAllDataDto> {
      return this.userService.getAdminUserList()
  }
}
