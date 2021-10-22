import { Controller } from '@nestjs/common';
import { ReferrerAwardService } from './referrer-award.service';

@Controller('referrer-award')
export class ReferrerAwardController {
  constructor(private referrerAwardService: ReferrerAwardService) {}
}
