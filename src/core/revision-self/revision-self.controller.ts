import { Controller } from '@nestjs/common';
import { RevisionSelfService } from './revision-self.service';

@Controller('revision-self')
export class RevisionSelfController {
  constructor(private revisionSelfService: RevisionSelfService) {}
}
