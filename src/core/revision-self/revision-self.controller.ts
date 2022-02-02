import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CompanyMemberGuard } from '../company-member/guard/company-member.guard';
import { CompanyEntity } from '../company/company.entity';
import { GetCompany } from '../company/decorator/get-company.decorator';
import { CompanyGuard } from '../company/guard/company.guard';
import { GetAccount } from '../user/decorator/get-account.decorator';
import { Roles } from '../user/decorator/role.decorator';
import { USER_ROLE } from '../user/enum/user-role.enum';
import { AccountGuard } from '../user/guard/account.guard';
import { UserEntity } from '../user/user.entity';
import { GetRevisionSelf } from './decorator/get-revision-self.decorator';
import { CreateRevisionSelfDto } from './dto/create-revision-self.dto';
import { GetRevisionSelfListDto } from './dto/get-revision-self-list.dto';
import { RevisionSelfGuard } from './guard/revision-self.guard';
import { RevisionSelfEntity } from './revision-self.entity';
import { RevisionSelfService } from './revision-self.service';

@Controller('revision-self')
export class RevisionSelfController {
  constructor(private revisionSelfService: RevisionSelfService) {}

  @Post('/company/:companyId')
  @Roles(USER_ROLE.USER)
  @UseGuards(AuthGuard(), AccountGuard, CompanyGuard, CompanyMemberGuard)
  createRevisionSelf(
    @Body(ValidationPipe)
    CreateRevisionSelfDto: CreateRevisionSelfDto,
    @GetCompany() company: CompanyEntity,
    @GetAccount() creator: UserEntity,
  ): Promise<void> {
    return this.revisionSelfService.createRevisionSelf(
      CreateRevisionSelfDto,
      company,
      creator,
    );
  }

  @Get('/company/:companyId/')
  @Roles(USER_ROLE.USER)
  @UseGuards(AuthGuard(), AccountGuard, CompanyGuard, CompanyMemberGuard)
  getRevisionSelfList(
    @GetCompany() company: CompanyEntity,
  ): Promise<GetRevisionSelfListDto> {
    return this.revisionSelfService.getRevisionSelfList(company);
  }

  @Get('/company/:companyId/revision/:revisionSelfId')
  @Roles(USER_ROLE.USER)
  @UseGuards(
    AuthGuard(),
    AccountGuard,
    CompanyGuard,
    CompanyMemberGuard,
    RevisionSelfGuard,
  )
  getRevisionSelf(
    @GetRevisionSelf() revision: RevisionSelfEntity,
  ): Promise<RevisionSelfEntity> {
    return this.revisionSelfService.getRevisionSelf(revision);
  }
}
