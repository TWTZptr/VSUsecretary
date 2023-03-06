import {
  IsOptional,
  IsNotEmpty,
  Length,
  IsEmail,
  IsInt,
} from 'class-validator';

export class UpdateEmployeeDto {
  @IsNotEmpty()
  @IsInt()
  readonly id: number;

  @IsNotEmpty()
  @Length(3, 40)
  @IsOptional()
  readonly name: string;

  @IsNotEmpty()
  @Length(3, 50)
  @IsOptional()
  readonly lastname: string;

  @IsNotEmpty()
  @Length(3, 50)
  @IsOptional()
  readonly patronymic: string;

  @IsNotEmpty()
  @Length(3, 50)
  @IsOptional()
  readonly academicDegree: string;

  @IsNotEmpty()
  @Length(3, 50)
  @IsOptional()
  readonly academicRank: string;

  @IsNotEmpty()
  @IsOptional()
  readonly position: string;

  @IsOptional()
  @Length(0, 50)
  readonly anotherJob?: string;

  @IsNotEmpty()
  @Length(4, 20)
  @IsOptional()
  readonly phoneNumber: string;

  @IsNotEmpty()
  @IsOptional()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @Length(4, 20)
  @IsOptional()
  readonly status: string;
}
