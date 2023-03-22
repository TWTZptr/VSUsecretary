import { IsNotEmpty, IsDate, IsInt } from 'class-validator';

export class UpdateGraduateScriptDto {
  @IsNotEmpty()
  @IsInt()
  readonly id: number;

  @IsNotEmpty()
  @IsDate()
  readonly date: Date;
}
