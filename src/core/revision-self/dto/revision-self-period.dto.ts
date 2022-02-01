import { IsNotEmpty, IsBoolean } from 'class-validator';

export class CreateRevisionSelfPeriodDto {
  @IsNotEmpty()
  year: string;

  @IsBoolean()
  kvartal1: boolean;

  @IsBoolean()
  kvartal2: boolean;

  @IsBoolean()
  kvartal3: boolean;

  @IsBoolean()
  kvartal4: boolean;
}
