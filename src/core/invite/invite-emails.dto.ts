import { IsEmail } from 'class-validator';

interface Address {
  name: string;
  address: string;
}

export class InviteEmailsDto {
  data: Array<string | Address>;
}
