import { Injectable } from '@nestjs/common';
import { UserEntity } from '../user/user.entity';
import { UserGetAccountDataDto, UserGetAccountAllDataDto } from './dto/user-get-account-data.dto';
import { UserGetAccountEmailDto } from './dto/user-get-account-email.dto';
import { InjectRepository } from '@nestjs/typeorm';
import {UserRepository} from './user.repository'

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository
  ){}

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
      phone: user.phone,
    };
    return userGetAccountDataDto;
  }

  async getAdminUserList(user : UserEntity): Promise<UserGetAccountAllDataDto> {
    const list: UserGetAccountDataDto[] = 
    await this.userRepository.getAdminUserList(user);

    return {list};
  }

}
