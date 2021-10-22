import { IsNotEmpty, IsString } from 'class-validator';
export class SendReferralLinkDto {
  @IsNotEmpty()
  @IsString()
  email: string;
}
