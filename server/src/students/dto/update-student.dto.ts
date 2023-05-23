import { Length, IsOptional, IsNotEmpty, IsInt } from 'class-validator';
import { ToOptionalInt } from 'src/decorators/to-not-blank-int';
import { ToBoolean } from '../../decorators/to-boolean';

export class UpdateStudentDto {
  @IsNotEmpty()
  @IsInt()
  readonly id: number;

  @IsNotEmpty()
  @IsOptional()
  @Length(3, 40)
  readonly name?: string;

  @IsNotEmpty()
  @IsOptional()
  @Length(3, 50)
  readonly lastname?: string;

  @IsInt()
  @IsNotEmpty()
  @IsOptional()
  readonly order?: number;

  @IsNotEmpty()
  @IsOptional()
  @Length(3, 50)
  readonly patronymic?: string;

  @IsInt()
  @IsNotEmpty()
  @IsOptional()
  readonly publications?: number;

  @IsInt()
  @ToOptionalInt()
  @IsOptional()
  readonly graduateScriptId?: number;

  @IsInt()
  @ToOptionalInt()
  @IsOptional()
  readonly index?: number;

  @ToBoolean()
  @IsOptional()
  @IsNotEmpty()
  readonly honor: boolean;
}
