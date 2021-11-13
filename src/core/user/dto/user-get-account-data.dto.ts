import {USER_ROLE} from '../enum/user-role.enum'

export class UserGetAccountDataDto {
  login: string;
  firstname: string;
  lastname: string;
  phone: string;
  email: string;
  confirmEmail: boolean;
  confirmPhone: boolean;
  role: USER_ROLE;
}
