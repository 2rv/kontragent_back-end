import {
  Injectable,
  CanActivate,
  ExecutionContext,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RevisionRepository } from '../revision.repository';

@Injectable()
export class RevisionGuard implements CanActivate {
  constructor(
    @InjectRepository(RevisionRepository)
    private revisionRepository: RevisionRepository,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { revisionId } = request.params;

    const revision = await this.revisionRepository.findOne({
      where: { id: revisionId },
    });

    if (!revision) {
      throw new BadRequestException();
    }

    request.revision = revision;

    return true;
  }
}
