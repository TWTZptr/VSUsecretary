import { IsInt, IsNotEmpty, Length } from 'class-validator';

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
  @IsNotEmpty()
  readonly directionId: number;
}
