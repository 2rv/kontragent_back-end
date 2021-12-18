import { Repository, EntityRepository } from 'typeorm';
import { UserEntity } from './user.entity';
import { AUTH_ERROR } from '../auth/enum/auth-error.enum';
import {
  BadRequestException,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { UserCreateDto } from './dto/user-create.dto';
import { ChangeUserRoleDto } from './dto/change-user-role.dto';

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {
  async createUser(userCreateDto: UserCreateDto): Promise<UserEntity> {
    const { login, firstname, lastname, password, phone, email } =
      userCreateDto;

    const user: UserEntity = new UserEntity();
    user.login = login;
    user.password = await UserEntity.hashPassword(password);
    user.phone = phone;
    user.firstname = firstname;
    user.lastname = lastname;
    user.email = email;
    try {
      await user.save();
      return user;
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException(AUTH_ERROR.USER_ALREADY_EXISTS);
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async confirmEmailById(userId: number): Promise<void> {
    try {
      this.update(userId, { confirmEmail: true });
    } catch {
      throw new BadRequestException();
    }
  }

  async confirmPhoneById(userId: number): Promise<void> {
    try {
      this.update(userId, { confirmPhone: true });
    } catch {
      throw new BadRequestException();
    }
  }

  async getAdminUserList(account: UserEntity) {
    return this.createQueryBuilder('user')
      .where('user.id != :id', { id: account.id })
      .select([
        'user.id',
        'user.login',
        'user.firstname',
        'user.lastname',
        'user.phone',
        'user.email',
        'user.confirmEmail',
        'user.confirmPhone',
        'user.role',
      ])
      .getMany();
  }

  async changeUserRole(
    user: UserEntity,
    changeUserRoleDto: ChangeUserRoleDto,
  ): Promise<void> {
    user.role = changeUserRoleDto.role;
    await user.save();
  }
}
