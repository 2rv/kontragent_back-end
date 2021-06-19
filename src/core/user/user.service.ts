import { Injectable } from '@nestjs/common';
import { UserEntity } from '../user/user.entity';
import { UserGetAccountEmailDto } from './dto/user-get-account-email.dto';
import { UserGetAccountPhoneDto } from './dto/user-get-account-phone.dto';

@Injectable()
export class UserService {
  async getAccountEmail(user: UserEntity): Promise<UserGetAccountEmailDto> {
    const userGetAccountEmailDto: UserGetAccountEmailDto = {
      email: user.email,
    };
    return userGetAccountEmailDto;
  }

  async getAccountPhone(user: UserEntity): Promise<UserGetAccountPhoneDto> {
    const userGetAccountPhoneDto: UserGetAccountPhoneDto = {
      phone: user.phone,
    };
    return userGetAccountPhoneDto;
  }
}
