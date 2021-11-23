import { IsNotEmpty, IsBoolean } from 'class-validator';

export class CreateRevisionYearDto {
  @IsNotEmpty()
  year: string;

  @IsBoolean()
  firstPeriod: boolean;

  @IsBoolean()
  secondPeriod: boolean;

  @IsBoolean()
  thirdPeriod: boolean;

  @IsBoolean()
  fourthPeriod: boolean;
}
