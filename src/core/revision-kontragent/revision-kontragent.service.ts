import { Injectable } from '@nestjs/common';
import { RevisionKontragentRepository } from './revision-kontragent.repository';

@Injectable()
export class RevisionKontragentService {
  constructor(
    private revisionKontragentRepository: RevisionKontragentRepository,
  ) {}
}
