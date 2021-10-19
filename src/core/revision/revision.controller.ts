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
import { GetRevision } from './decorator/get-revision.decorator';
import { CreateRevisionDto } from './dto/create-revision.dto';
import { GetCompanyRevisionListDto } from './dto/get-company-revision-list.dto';
import { GetRevisionInfoDto } from './dto/get-revision-info.dto';
import { UpdateRevisionDto } from './dto/update-revision-info.dto';
import { RevisionGuard } from './guard/revision.guard';
import { RevisionEntity } from './revision.entity';
import { RevisionService } from './revision.service';

@Controller('revision')
export class RevisionController {
  constructor(private revisionService: RevisionService) {}

  @Post('/company/:companyId/')
  @Roles(USER_ROLE.USER)
  @UseGuards(AuthGuard(), AccountGuard, CompanyGuard, CompanyMemberGuard)
  async createRevision(
    @Body(ValidationPipe) createRevisionDto: CreateRevisionDto,
    @GetCompany() company: CompanyEntity,
  ): Promise<GetRevisionInfoDto> {
    return this.revisionService.createRevision(createRevisionDto, company);
  }

  @Patch('/company/:companyId/revision/:revisionId/review')
  @Roles(USER_ROLE.ADMIN)
  @UseGuards(AuthGuard(), AccountGuard, CompanyGuard, RevisionGuard)
  async updateRevisionReview(
    @Body(ValidationPipe) updateRevisionDto: UpdateRevisionDto,
    @GetRevision() revision: RevisionEntity,
  ): Promise<GetRevisionInfoDto> {
    return this.revisionService.updateRevisionReview(
      updateRevisionDto,
      revision,
    );
  }

  @Get('/company/:companyId/')
  @Roles(USER_ROLE.USER)
  @UseGuards(AuthGuard(), AccountGuard, CompanyGuard, CompanyMemberGuard)
  getCompanyRevisionList(
    @GetCompany() company: CompanyEntity,
  ): Promise<GetCompanyRevisionListDto> {
    return this.revisionService.getCompanyRevisionList(company);
  }

  @Get('/admin/company/:companyId/')
  @Roles(USER_ROLE.ADMIN)
  @UseGuards(AuthGuard(), AccountGuard, CompanyGuard)
  getAdminCompanyRevisionList(
    @GetCompany() company: CompanyEntity,
  ): Promise<GetCompanyRevisionListDto> {
    return this.revisionService.getCompanyRevisionList(company);
  }

  @Get('/company/:companyId/revision/:revisionId/review')
  @Roles(USER_ROLE.USER, USER_ROLE.ADMIN)
  @UseGuards(
    AuthGuard(),
    AccountGuard,
    CompanyGuard,
    CompanyMemberGuard,
    RevisionGuard,
  )
  async getRevisionReview(
    @GetRevision() revision: RevisionEntity,
  ): Promise<GetRevisionInfoDto> {
    return this.revisionService.getRevisionReview(revision);
  }

  @Post('/company/:companyId/revision/:revisionId/review/payment')
  @Roles(USER_ROLE.USER, USER_ROLE.ADMIN)
  @UseGuards(
    AuthGuard(),
    AccountGuard,
    CompanyGuard,
    CompanyMemberGuard,
    RevisionGuard,
  )
  async createRevisionReviewPayment(
    @GetRevision() revision: RevisionEntity,
    @GetCompany() company: CompanyEntity,
  ): Promise<void> {
    return this.revisionService.createRevisionReviewPayment(revision, company);
  }
}
