import { IsInt, IsNotEmpty } from 'class-validator';

export class SetGraduateScriptSingleEmployeeDto {
  @IsNotEmpty()
  @IsInt()
  readonly employeeId: number;
}
