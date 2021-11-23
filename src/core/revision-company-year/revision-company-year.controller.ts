import { Controller } from '@nestjs/common';
import { RevisionCompanyYearService } from './revision-company-year.service';

@Controller('revision-company-year')
export class RevisionCompanyYearController {
  constructor(
    private readonly revisionCompanyYearService: RevisionCompanyYearService,
  ) {}
}
