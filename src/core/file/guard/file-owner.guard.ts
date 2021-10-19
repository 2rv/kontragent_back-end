import {
  Injectable,
  CanActivate,
  ExecutionContext,
  BadRequestException,
  NotAcceptableException,
} from '@nestjs/common';

import { FILE_ERROR } from '../enum/file-error.enum';
import { USER_ROLE } from 'src/core/user/enum/user-role.enum';

@Injectable()
export class FileOwnerGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { file, userAccount } = request;

    if (!file || !userAccount) {
      throw new BadRequestException();
    }

    if (!file) {
      throw new BadRequestException(FILE_ERROR.FILE_NOT_FOUND);
    }

    if (file.user !== userAccount.id && userAccount.role !== USER_ROLE.ADMIN) {
      throw new NotAcceptableException(FILE_ERROR.FILE_OWNER_IS_UNCORRECT);
    }

    return true;
  }
}
