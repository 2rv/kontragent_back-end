import { Injectable } from '@nestjs/common';
import { UserEntity } from '../user/user.entity';
import { UserGetAccountEmailDto } from './dto/user-get-account-email.dto';

@Injectable()
export class UserService {
  async getAccountEmail(user: UserEntity): Promise<UserGetAccountEmailDto> {
    const userGetAccountEmailDto: UserGetAccountEmailDto = {
      email: user.email,
    };
    return userGetAccountEmailDto;
  }
}
