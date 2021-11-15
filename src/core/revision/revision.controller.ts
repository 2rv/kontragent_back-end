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
import { CreateRevisionCompanyDto } from '../revision-company/dto/create-revision-company.dto';
import { GetCompanyRevisionListDto } from './dto/get-company-revision-list.dto';
import { GetRevisionListInfoDto } from './dto/get-revision-list-info.dto';
import { UpdateRevisionDto } from './dto/update-revision-info.dto';
import { RevisionGuard } from './guard/revision.guard';
import { RevisionEntity } from './revision.entity';
import { RevisionService } from './revision.service';

@Controller('revision')
export class RevisionController {
  constructor(private revisionService: RevisionService) {}

  @Post('/company/:companyId')
  @Roles(USER_ROLE.USER)
  @UseGuards(AuthGuard(), AccountGuard, CompanyGuard, CompanyMemberGuard)
  async createRevision(
    @Body(ValidationPipe) createRevisionCompanyDto: CreateRevisionCompanyDto[],
    @GetCompany() company: CompanyEntity,
  ): Promise<void> {
    return this.revisionService.createRevision(
      createRevisionCompanyDto,
      company,
    );
  }

  @Patch('/review/:revisionId')
  @Roles(USER_ROLE.ADMIN)
  @UseGuards(AuthGuard(), AccountGuard, RevisionGuard)
  async updateRevisionReview(
    @Body(ValidationPipe) updateRevisionDto: UpdateRevisionDto,
    @GetRevision() revision: RevisionEntity,
  ): Promise<void> {
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

  @Get('/admin')
  @Roles(USER_ROLE.ADMIN)
  @UseGuards(AuthGuard(), AccountGuard)
  getAdminRevisionList(): Promise<GetRevisionListInfoDto> {
    return this.revisionService.getRevisionList();
  }

  @Get('/company/:companyId/revision/:revisionId/review')
  @Roles(USER_ROLE.USER)
  @UseGuards(
    AuthGuard(),
    AccountGuard,
    CompanyGuard,
    CompanyMemberGuard,
    RevisionGuard,
  )
  async getRevisionReview(
    @GetRevision() revision: RevisionEntity,
  ): Promise<RevisionEntity> {
    return this.revisionService.getRevisionReview(revision);
  }

  @Get('/admin/revision/:revisionId/review')
  @Roles(USER_ROLE.ADMIN)
  @UseGuards(AuthGuard(), AccountGuard, RevisionGuard)
  async getAdminRevisionReview(
    @GetRevision() revision: RevisionEntity,
  ): Promise<RevisionEntity> {
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
