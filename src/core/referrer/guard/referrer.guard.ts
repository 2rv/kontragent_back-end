import {
  Injectable,
  CanActivate,
  ExecutionContext,
  BadRequestException,
} from '@nestjs/common';
import { ReferrerRepository } from '../referrer.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { REFERRER_ERROR } from '../enum/referrer-error.enum';

@Injectable()
export class ReferrerGuard implements CanActivate {
  constructor(
    @InjectRepository(ReferrerRepository)
    private referrerRepository: ReferrerRepository,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { params } = request;

    if (isNaN(params.referrerId)) {
      throw new BadRequestException();
    }

    const referrer = await this.referrerRepository.findOne({
      where: { id: params.referrerId },
    });

    if (!referrer) {
      throw new BadRequestException(
        REFERRER_ERROR.REFERRER_WITH_THIS_ID_NOT_FOUND,
      );
    }

    request.referrer = referrer;

    return true;
  }
}
