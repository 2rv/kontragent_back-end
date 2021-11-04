import {
  Injectable,
  CanActivate,
  ExecutionContext,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RevisionRepository } from '../revision.repository';
import { CompanyEntity } from '../../company/company.entity';

@Injectable()
export class RevisionGuard implements CanActivate {
  constructor(
    @InjectRepository(RevisionRepository)
    private revisionRepository: RevisionRepository,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { revisionId } = request.params;
    const { company }: { company: CompanyEntity } = request.company;
    console.log(JSON.stringify(company));

    const revision = await this.revisionRepository.findOne({
      where: { id: revisionId, company: { id: company.id } },
    });

    if (!revision) {
      throw new NotFoundException();
    }

    request.revision = revision;

    return true;
  }
}
