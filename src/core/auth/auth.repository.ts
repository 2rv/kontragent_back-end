import { Repository, EntityRepository } from 'typeorm';
import { UserEntity } from '../user/user.entity';
import { AUTH_ERROR } from './enum/auth-error.enum';
import {
  ConflictException,
  InternalServerErrorException,
  BadRequestException,
} from '@nestjs/common';
import { UserLoginDto } from './dto/user-login.dto';
import { UserSignUpDto } from './dto/user-sign-up.dto';

@EntityRepository(UserEntity)
export class AuthRepository extends Repository<UserEntity> {
  async signUp(userSignUpDto: UserSignUpDto): Promise<UserEntity> {
    const { login, password, email } = userSignUpDto;
    console.log(password);
    
    if (await this.findOne({ where: { login: login } }))
      throw new ConflictException(AUTH_ERROR.USERNAME_ALREADY_EXISTS);

    if (await this.findOne({ where: { email: email } }))
      throw new ConflictException(AUTH_ERROR.EMAIL_ALREADY_EXISTS);

    const user: UserEntity = this.create();
    user.login = login;
    user.email = email;
    user.password = await UserEntity.hashPassword(password);
    try {
      await user.save();
      return user;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async login(userLoginDto: UserLoginDto): Promise<UserEntity> {
    const { login, password } = userLoginDto;

    const user =
      (await this.findOne({
        where: [{ login }],
      })) ||
      (await this.findOne({
        where: [{ email: login }],
      }));
      
    if (user === undefined) {
      throw new BadRequestException(AUTH_ERROR.COULDNT_FOUND_USER);
    } else {
      const passwordCorrect = await user.validatePassword(password);

      if (passwordCorrect === false) {
        throw new BadRequestException(AUTH_ERROR.UNCORRECT_PASSWORD_OR_LOGIN);
      } else {
        return user;
      }
    }
  }
}
