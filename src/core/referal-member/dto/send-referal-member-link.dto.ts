import { IsNotEmpty, IsString } from 'class-validator';
export class SendReferalMemberLinkDto {
  @IsNotEmpty()
  @IsString()
  credential: string;
}
