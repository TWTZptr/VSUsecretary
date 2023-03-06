import { IsEmail, Length, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateEmployeeDto {
  @IsNotEmpty()
  @Length(3, 40)
  readonly name: string;

  @IsNotEmpty()
  @Length(3, 50)
  readonly lastname: string;

  @IsNotEmpty()
  @Length(3, 50)
  readonly patronymic: string;

  @IsNotEmpty()
  @Length(3, 50)
  readonly academicDegree: string;

  @IsNotEmpty()
  @Length(3, 50)
  readonly academicRank: string;

  @IsNotEmpty()
  readonly position: string;

  @IsOptional()
  @Length(0, 50)
  readonly anotherJob?: string;

  @IsNotEmpty()
  @Length(4, 20)
  readonly phoneNumber: string;

  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @Length(4, 20)
  readonly status: string;
}
