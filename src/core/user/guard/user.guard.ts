import {
  Injectable,
  CanActivate,
  ExecutionContext,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { UserEntity } from '../user.entity';
import { USER_ROLE } from '../enum/user-role.enum';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { USER_ERROR } from '../enum/user-error.enum'

@Injectable()
export class UserGuard implements CanActivate {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { params } = request;

    if (isNaN(params.userId)) {
      throw new BadRequestException();
    }

    const user = await this.userRepository.findOne({
      where: { id: params.userId },
    });

    if (!user) {
      throw new NotFoundException(USER_ERROR.CANNOT_FIND_USER);
    }

    if (String(user.role) === String(USER_ROLE.BLOCKED)) {
      return false;
    }

    request.user = user;

    return true;
  }
}
