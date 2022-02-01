import { Controller } from '@nestjs/common';
import { RevisionSelfService } from './revision-self.service';

@Controller('revision-self')
export class RevisionSelfController {
  constructor(private revisionSelfService: RevisionSelfService) {}

  // @Post('/self/:companyId')
  // @Roles(USER_ROLE.USER)
  // @UseGuards(AuthGuard(), AccountGuard, CompanyGuard, CompanyMemberGuard)
  // async createRevisionSelf(
  //   @Body(ValidationPipe)
  //   createRevisionOwnCompanyDto: any,
  //   @GetCompany() company: CompanyEntity,
  //   @GetAccount() creator: UserEntity,
  // ): Promise<void> {
  //   return this.revisionService.createSelfRevision(
  //     createRevisionOwnCompanyDto,
  //     company,
  //     creator,
  //   );
  // }
}
