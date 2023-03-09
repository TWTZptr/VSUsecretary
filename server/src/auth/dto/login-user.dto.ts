import { IsInt, IsNotEmpty } from 'class-validator';

export class LoginUserDto {
  @IsNotEmpty()
  @IsInt()
  roleId: number;

  @IsNotEmpty()
  password: string;
}
