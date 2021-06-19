import { USER_ROLE } from '../../user/enum/user-role.enum';

export interface JwtPayload {
  id: number;
  role: USER_ROLE;
  phone: string;
  email: string;
}
