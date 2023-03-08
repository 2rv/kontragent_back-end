import {
  Injectable,
  CanActivate,
  ExecutionContext,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RevisionSelfRepository } from '../revision-self.repository';
import { CompanyEntity } from '../../company/company.entity';

@Injectable()
export class RevisionSelfGuard implements CanActivate {
  constructor(
    @InjectRepository(RevisionSelfRepository)
    private revisionSelfRepository: RevisionSelfRepository,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { revisionSelfId } = request.params;
    const { company }: { company: CompanyEntity } = request;

    const revisionSelf = company
      ? await this.revisionSelfRepository.findOne({
          where: { id: revisionSelfId, company: { id: company.id } },
        })
      : await this.revisionSelfRepository.findOne({
          where: { id: revisionSelfId },
        });

    if (!revisionSelf) {
      throw new NotFoundException();
    }

    request.revisionSelf = revisionSelf;

    return true;
  }
}
