import {
  Injectable,
  CanActivate,
  ExecutionContext,
  BadRequestException,
} from '@nestjs/common';

import { FileRepository } from '../file.repository';
import { FILE_ERROR } from '../enum/file-error.enum';
import { USER_ROLE } from 'src/core/user/enum/user-role.enum';
import { Reflector } from '@nestjs/core';
import { UserEntity } from 'src/core/user/user.entity';

@Injectable()
export class FileGuard implements CanActivate {
  constructor(
    private fileRepository: FileRepository,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { params, userAccount }: { params: any; userAccount: UserEntity } =
      request;

    if (!params.fileId) {
      throw new BadRequestException();
    }

    const file = await this.fileRepository.findOne({
      where: { id: params.fileId },
      // relations: ['user'],
    });

    if (!file) {
      throw new BadRequestException(FILE_ERROR.FILE_NOT_FOUND);
    }

    const { role = null }: { role: USER_ROLE } = userAccount;

    if (role === null) {
      return false;
    }

    const roles: number[] = this.reflector.get<number[]>(
      'roles',
      context.getHandler(),
    );

    if (roles) {
      const index = roles.indexOf(role);

      if (index === -1) {
        return false;
      }
    }

    request.file = file;

    return true;
  }
}
