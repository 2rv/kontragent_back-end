import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { SupportService } from './support.service';
import { CreateSupportRequestDto } from './dto/create-support-request.dto';
import { AuthGuard } from '@nestjs/passport';
import { AccountGuard } from '../user/guard/account.guard';
import { GetAccount } from '../user/decorator/get-account.decorator';
import { UserEntity } from '../user/user.entity';

@Controller('support')
export class SupportController {
  constructor(private supportService: SupportService) {}

  @Post('/create')
  @UseGuards(AuthGuard(), AccountGuard)
  createCompany(
    @Body(ValidationPipe) createSupportRequestDto: CreateSupportRequestDto,
    @GetAccount() user: UserEntity,
  ): Promise<void> {
    return this.supportService.createRequest(createSupportRequestDto, user);
  }
}
