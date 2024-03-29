import { Injectable, BadRequestException } from '@nestjs/common';
import { UserEntity } from '../user/user.entity';
import { UserGetAccountDataDto } from './dto/user-get-account-data.dto';
import { UserGetAdminUserListDto } from './dto/user-get-admin-user-list.dto';
import { UserGetAccountEmailDto } from './dto/user-get-account-email.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { ChangeUserRoleDto } from './dto/change-user-role.dto';
import { USER_ROLE_ERROR } from './enum/user-role-error.enum';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {}

  async getAccountEmail(user: UserEntity): Promise<UserGetAccountEmailDto> {
    const userGetAccountEmailDto: UserGetAccountEmailDto = {
      email: user.email,
    };
    return userGetAccountEmailDto;
  }

  async getUserData(user: UserEntity): Promise<UserGetAccountDataDto> {
    const userGetAccountDataDto: UserGetAccountDataDto = {
      email: user.email,
      login: user.login,
      firstname: user.firstname,
      lastname: user.lastname,
      confirmEmail: user.confirmEmail,
      confirmPhone: user.confirmPhone,
      createDate: user.createDate,
      phone: user.phone,
      role: user.role,
    };
    return userGetAccountDataDto;
  }

  async getAdminUserList(
    account: UserEntity,
  ): Promise<UserGetAdminUserListDto> {
    const list: UserEntity[] = await this.userRepository.getAdminUserList(
      account,
    );
    return { list };
  }

  async changeUserRole(
    user: UserEntity,
    changeUserRoleDto: ChangeUserRoleDto,
    account: UserEntity,
  ): Promise<void> {
    if (user.id === account.id) {
      throw new BadRequestException(
        USER_ROLE_ERROR.CANNOT_CHANGE_THE_ROLE_OF_YOURSELF,
      );
    }

    await this.userRepository.changeUserRole(user, changeUserRoleDto);
  }
}
