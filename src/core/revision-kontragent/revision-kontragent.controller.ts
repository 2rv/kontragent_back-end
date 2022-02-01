import { Controller } from '@nestjs/common';
import { RevisionKontragentService } from './revision-kontragent.service';

@Controller('revision-kontragent')
export class RevisionKontragentController {
  constructor(private revisionKontragentService: RevisionKontragentService) {}
}
