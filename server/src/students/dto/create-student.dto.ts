import { Length, IsOptional, IsNotEmpty, IsInt } from 'class-validator';
import { ToOptionalInt } from 'src/decorators/to-not-blank-int';

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
  readonly publications: number;

  @IsInt()
  @ToOptionalInt()
  @IsOptional()
  readonly groupId?: number;
}
