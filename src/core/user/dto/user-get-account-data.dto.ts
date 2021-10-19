export class UserGetAccountDataDto {
  login: string;
  firstname: string;
  lastname: string;
  phone: string;
  email: string;
  confirmEmail: boolean;
  confirmPhone: boolean;
}

export class UserGetAccountAllDataDto {
  list: UserGetAccountDataDto[]
}
