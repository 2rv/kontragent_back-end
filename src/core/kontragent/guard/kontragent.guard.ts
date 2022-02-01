import {
  Injectable,
  CanActivate,
  ExecutionContext,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { KontragentRepository } from '../kontragent.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { KONTRAGENT_ERROR } from '../enum/kontragent-error.enum';

@Injectable()
export class KontragentGuard implements CanActivate {
  constructor(
    @InjectRepository(KontragentRepository)
    private kontragentRepository: KontragentRepository,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { params }: { params: any } = request;

    if (isNaN(params.kontragentId)) {
      throw new BadRequestException();
    }

    const kontragent = await this.kontragentRepository.findOne({
      where: { id: params.kontragentId },
      relations: ['consumer', 'contractor'],
    });

    if (!kontragent) {
      throw new NotFoundException(KONTRAGENT_ERROR.CANNOT_FIND_KONTRAGENT);
    }

    request.kontragent = kontragent;

    return true;
  }
}
