import { IsNotEmpty, IsInt } from 'class-validator';

export class AddGraduateScriptDto {
  @IsInt()
  @IsNotEmpty()
  employeeId: number;

  @IsInt()
  @IsNotEmpty()
  graduateScriptId: number;
}
