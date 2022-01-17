import {
  Injectable,
  CanActivate,
  ExecutionContext,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RevisionRepository } from '../revision.repository';
import { CompanyEntity } from '../../company/company.entity';
import { REVISION_ERROR } from '../enum/revision-error.enum';

@Injectable()
export class RevisionGuard implements CanActivate {
  constructor(
    @InjectRepository(RevisionRepository)
    private revisionRepository: RevisionRepository,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { revisionId } = request.params;
    const { company }: { company: CompanyEntity } = request;

    const revision = company
      ? await this.revisionRepository.findOne({
          where: { id: revisionId, company: { id: company.id } },
        })
      : await this.revisionRepository.findOne({
          where: { id: revisionId },
        });

    if (!revision) {
      throw new NotFoundException(REVISION_ERROR.REVISION_NOT_FOUND);
    }

    request.revision = revision;

    return true;
  }
}
