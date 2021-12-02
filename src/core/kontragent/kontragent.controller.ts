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

  @Post('/company/:companyId/')
  @UseGuards(
    AuthGuard(),
    AccountGuard,
    KontragentGuard,
    KontragentConsumerGuard,
    CompanyGuard,
    CompanyMemberGuard,
  )
  createKontragent(
    @Body() createKontragentDto: CreateKontragentDto,
    @GetAccount() user: UserEntity,
    @Param('companyId') companyId,
  ): Promise<KontragentEntity> {
    return this.kontragentService.createKontragent(
      createKontragentDto,
      user,
      companyId,
    );
  }

  @Get('/company/:companyId/:kontragentId')
  @UseGuards(AuthGuard(), AccountGuard, KontragentGuard, CompanyMemberGuard)
  getOneKontragent(
    @Param('companyId') companyId: string,
    @Param('kontragentId') kontragentId: string,
  ): Promise<KontragentEntity> {
    return this.kontragentService.getOneKontragent(companyId, kontragentId);
  }

  @Delete('/delete/company/:companyId/:kontragentId')
  @UseGuards(
    AuthGuard(),
    AccountGuard,
    KontragentGuard,
    KontragentConsumerGuard,
    CompanyGuard,
    CompanyMemberGuard,
  )
  deleteKontragent(
    @GetAccount() user: UserEntity,
    @Param('companyId') companyId: string,
    @Param('kontragentId') kontragentId: string,
  ) {
    return this.kontragentService.deleteKontragent(
      user,
      companyId,
      kontragentId,
    );
  }

  @Get('/get')
  @UseGuards(AuthGuard(), AccountGuard, KontragentGuard, CompanyMemberGuard)
  getAll(): Promise<KontragentEntity[]> {
    return this.kontragentService.getAll();
  }
}
