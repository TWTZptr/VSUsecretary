import { Length, IsNotEmpty, IsInt } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @Length(2, 40)
  name: string;

  @IsNotEmpty()
  password: string;

  @IsInt()
  @IsNotEmpty()
  roleId: number;
}
