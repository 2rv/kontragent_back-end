import { IsNotEmpty, IsString } from 'class-validator';

export class InviteDto {
    @IsNotEmpty()
    @IsString()
    email: string;
}