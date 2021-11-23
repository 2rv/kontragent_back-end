import { RevisionCompanyYearRepository } from './revision-company-year.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RevisionCompanyYearService {
  constructor(
    private revisionCompanyYearRepository: RevisionCompanyYearRepository,
  ) {}
}
