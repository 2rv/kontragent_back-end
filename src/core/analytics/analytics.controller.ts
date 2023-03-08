import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../user/decorator/role.decorator';
import { USER_ROLE } from '../user/enum/user-role.enum';
import { AnalyticsService } from './analytics.service';
import { GetAnalyticsData } from './dto/analytics.dto';

@Controller('analytics')
export class AnalyticsController {
  constructor(private analyticsService: AnalyticsService) {}

  @Get('/')
  getAnalytics(): Promise<GetAnalyticsData> {
    return this.analyticsService.getAnalytics();
  }
}
