import { CompanyMemberEntity } from '../company-memeber.entity';
import { COMPANY_MEMBER_ROLE } from '../enum/company-member-role.enum';

export class GetCompanyMemberListDto {
  list: CompanyMemberEntity[];
  companyMemberRole: COMPANY_MEMBER_ROLE;
}
