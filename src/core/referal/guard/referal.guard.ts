import {
  Injectable,
  CanActivate,
  ExecutionContext,
  BadRequestException,
} from '@nestjs/common';
import { ReferalRepository } from '../referal.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { REFERAL_ERROR } from '../enum/referal-error.enum';

@Injectable()
export class ReferalGuard implements CanActivate {
  constructor(
    @InjectRepository(ReferalRepository)
    private referalRepository: ReferalRepository,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { params } = request;

    if (isNaN(params.referalId)) {
      throw new BadRequestException();
    }

    const referal = await this.referalRepository.findOne({
      where: { id: params.referalId },
    });

    if (!referal) {
      throw new BadRequestException(
        REFERAL_ERROR.REFERAL_WITH_THIS_ID_NOT_FOUND,
      );
    }

    request.referal = referal;

    return true;
  }
}
