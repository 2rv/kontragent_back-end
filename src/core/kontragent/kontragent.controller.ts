import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Delete,
  Param,
} from '@nestjs/common';

import { AuthGuard } from '@nestjs/passport';
import { AccountGuard } from '../user/guard/account.guard';
import { UserEntity } from '../user/user.entity';
import { GetAccount } from '../user/decorator/get-account.decorator';

import { KontragentService } from './kontragent.service';
import { CreateKontragentDto } from './dto/create-kontragent.dto';
import { KontragentGuard } from './guard/kontragent.guard';
import { KontragentConsumerGuard } from './guard/kontragent-consumer.guard';
import { CompanyGuard } from '../company/guard/company.guard';
import { CompanyMemberGuard } from '../company-member/guard/company-member.guard';
import { KontragentEntity } from './kontragent.entity';

@Controller('kontragent')
export class KontragentController {
  constructor(private kontragentService: KontragentService) {}

  @Post('/create')
  @UseGuards(
    AuthGuard(),
    AccountGuard,
    CompanyGuard,
    CompanyMemberGuard,
    KontragentGuard,
    KontragentConsumerGuard,
  )
  create(
    @Body() createKontragentDto: CreateKontragentDto,
  ): Promise<KontragentEntity> {
    return this.kontragentService.createKontragent(createKontragentDto);
  }

  @Get('/get')
  @UseGuards(AuthGuard(), AccountGuard, CompanyGuard)
  getAll(): Promise<KontragentEntity[]> {
    return this.kontragentService.getAll();
  }

  @Get('/get/:kontragentId')
  @UseGuards(
    AuthGuard(),
    AccountGuard,
    CompanyGuard,
    CompanyMemberGuard,
    KontragentGuard,
    KontragentConsumerGuard,
  )
  getOne(
    @Param('kontragentId') kontragentId: string,
  ): Promise<KontragentEntity> {
    return this.kontragentService.getOne(kontragentId);
  }

  @Delete('/delete/:kontragentId')
  @UseGuards(
    AuthGuard(),
    AccountGuard,
    CompanyGuard,
    CompanyMemberGuard,
    KontragentGuard,
    KontragentConsumerGuard,
  )
  delete(@Param('kontragentId') kontragentId: string) {
    return this.kontragentService.delete(kontragentId);
  }
}
