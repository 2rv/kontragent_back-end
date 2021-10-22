import { Controller } from '@nestjs/common';
import { ReferalAchievementService } from './referal-achievement.service';

@Controller('referal-achievement')
export class ReferalAchievementController {
  constructor(private referalAchievementService: ReferalAchievementService) {}
}
