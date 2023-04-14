import { IsInt, IsNotEmpty } from 'class-validator';

export class SetGraduateScriptCommissionMemberDto {
  @IsNotEmpty()
  @IsInt()
  index: number;

  @IsNotEmpty()
  @IsInt()
  readonly employeeId: number;
}
