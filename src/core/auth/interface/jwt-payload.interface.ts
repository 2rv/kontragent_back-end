import { USER_ROLE } from '../../user/enum/user-role.enum';

export interface JwtPayload {
  id: number;
  role: USER_ROLE;
  firstname: string;
  lastname: string;
  phone: string;
  email: string;
  confirmPhone: boolean;
  confirmEmail: boolean;
  companyIdArray: number[];
}
