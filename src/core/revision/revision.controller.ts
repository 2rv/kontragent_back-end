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
import { CompanyMemberGuard } from '../company-member/guard/company-member.guard';
import { CompanyEntity } from '../company/company.entity';
import { GetCompany } from '../company/decorator/get-company.decorator';
import { CompanyGuard } from '../company/guard/company.guard';
import { Roles } from '../user/decorator/role.decorator';
import { USER_ROLE } from '../user/enum/user-role.enum';
import { AccountGuard } from '../user/guard/account.guard';
import { GetAccount } from '../user/decorator/get-account.decorator';
import { UserEntity } from '../user/user.entity';

import { RevisionEntity } from './revision.entity';
import { RevisionService } from './revision.service';
import { RevisionGuard } from './guard/revision.guard';
import { GetRevision } from './decorator/get-revision.decorator';

import { GetRevisionListDto } from './dto/get-revision-list.dto';
import { UpdateRevisionDto } from './dto/update-revision.dto';
import { CreateRevisionDto } from './dto/create-revision.dto';

@Controller('revision')
export class RevisionController {
  constructor(private revisionService: RevisionService) {}

  @Post('/company/:companyId')
  @Roles(USER_ROLE.USER)
  @UseGuards(AuthGuard(), AccountGuard, CompanyGuard, CompanyMemberGuard)
  createRevision(
    @Body(ValidationPipe)
    createRevisionDto: CreateRevisionDto,
    @GetCompany() company: CompanyEntity,
    @GetAccount() creator: UserEntity,
  ): Promise<void> {
    return this.revisionService.createRevision(
      createRevisionDto,
      company,
      creator,
    );
  }

  @Get('/company/:companyId/')
  @Roles(USER_ROLE.USER)
  @UseGuards(AuthGuard(), AccountGuard, CompanyGuard, CompanyMemberGuard)
  getRevisionList(
    @GetCompany() company: CompanyEntity,
  ): Promise<GetRevisionListDto> {
    return this.revisionService.getRevisionList(company);
  }

  @Get('/company/:companyId/revision/:revisionId')
  @Roles(USER_ROLE.USER)
  @UseGuards(
    AuthGuard(),
    AccountGuard,
    CompanyGuard,
    CompanyMemberGuard,
    RevisionGuard,
  )
  getRevision(
    @GetRevision() revision: RevisionEntity,
  ): Promise<RevisionEntity> {
    return this.revisionService.getRevision(revision);
  }

  @Get('/admin')
  @Roles(USER_ROLE.ADMIN)
  @UseGuards(AuthGuard(), AccountGuard)
  getAdminRevisionList(): Promise<GetRevisionListDto> {
    return this.revisionService.getAdminRevisionList();
  }

  @Get('/admin/revision/:revisionId')
  @Roles(USER_ROLE.ADMIN)
  @UseGuards(AuthGuard(), AccountGuard, RevisionGuard)
  getAdminRevision(
    @GetRevision() revision: RevisionEntity,
  ): Promise<RevisionEntity> {
    return this.revisionService.getAdminRevision(revision);
  }

  //------- старый код

  @Get('/admin/company/:companyId/')
  @Roles(USER_ROLE.ADMIN)
  @UseGuards(AuthGuard(), AccountGuard, CompanyGuard)
  getAdminCompanyRevisionList(
    @GetCompany() company: CompanyEntity,
  ): Promise<GetRevisionListDto> {
    return this.revisionService.getRevisionList(company);
  }

  @Patch('/revision/:revisionId')
  @Roles(USER_ROLE.ADMIN)
  @UseGuards(AuthGuard(), AccountGuard, RevisionGuard)
  updateRevisionReview(
    @Body(ValidationPipe) updateRevisionDto: UpdateRevisionDto,
    @GetRevision() revision: RevisionEntity,
  ): Promise<void> {
    return this.revisionService.updateRevision(updateRevisionDto, revision);
  }

  @Post('/company/:companyId/revision/:revisionId/payment')
  @Roles(USER_ROLE.USER, USER_ROLE.ADMIN)
  @UseGuards(
    AuthGuard(),
    AccountGuard,
    CompanyGuard,
    CompanyMemberGuard,
    RevisionGuard,
  )
  createRevisionPayment(
    @GetRevision() revision: RevisionEntity,
    @GetCompany() company: CompanyEntity,
  ): Promise<void> {
    return this.revisionService.createRevisionPayment(revision, company);
  }
}
