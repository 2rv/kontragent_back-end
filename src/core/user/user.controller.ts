import { Body,Controller, Get, Patch, UseGuards, ValidationPipe, } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetAccount } from '../user/decorator/get-account.decorator';
import { AccountGuard } from '../user/guard/account.guard';
import { UserEntity } from '../user/user.entity';
import { UserService } from './user.service';
import { UserGetAccountEmailDto } from './dto/user-get-account-email.dto';
import { Roles } from './decorator/role.decorator';
import { USER_ROLE } from './enum/user-role.enum';
import { GetUser } from './decorator/get-user.decorator';
import { UserGetAccountDataDto } from './dto/user-get-account-data.dto';
import { UserGetAdminUserListDto } from './dto/user-get-admin-user-list.dto';
import {ChangeUserRoleDto} from './dto/change-user-role.dto'
import { AllUserGuard } from './guard/all-user.guard';

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
  @UseGuards(AuthGuard(), AccountGuard, AllUserGuard)
  getUserData(@GetUser() user: UserEntity): Promise<UserGetAccountDataDto> {
    return this.userService.getUserData(user);
  }

  @Get('/admin')
  @Roles(USER_ROLE.ADMIN)
  @UseGuards(AuthGuard(), AccountGuard)
  getAdminUserList(
    @GetAccount() account: UserEntity
  ): Promise<UserGetAdminUserListDto> {
    return this.userService.getAdminUserList(account);
  }

  @Patch('/admin/:userId/role')
  @Roles(USER_ROLE.ADMIN)
  @UseGuards(AuthGuard(), AccountGuard, AllUserGuard)
  async changeUserRole(
    @Body(ValidationPipe) changeUserRoleDto: ChangeUserRoleDto,
    @GetAccount() account: UserEntity,
    @GetUser() user: UserEntity): Promise<void> {
    return this.userService.changeUserRole(user, changeUserRoleDto, account);
  }
}
