import { Injectable } from '@nestjs/common';
import { RevisionSelfRepository } from './revision-self.repository';

@Injectable()
export class RevisionSelfService {
  constructor(private revisionSelfRepository: RevisionSelfRepository) {}
}
