import { IsInt, IsNotEmpty, IsOptional, Length } from 'class-validator';
import { ToOptionalInt } from '../../decorators/to-not-blank-int';

export class CreateStudentDto {
  @IsNotEmpty()
  @Length(3, 40)
  readonly name: string;

  @IsNotEmpty()
  @Length(3, 50)
  readonly lastname: string;

  @IsNotEmpty()
  @Length(3, 50)
  readonly patronymic: string;

  @IsInt()
  @IsNotEmpty()
  readonly directionId: number;

  @IsInt()
  @ToOptionalInt()
  @IsOptional()
  readonly graduateScriptId?: number;
}
