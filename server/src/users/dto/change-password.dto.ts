import { IsInt, IsNotEmpty } from 'class-validator';

export class ChangePasswordDto {
  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  adminPassword: string;

  @IsInt()
  @IsNotEmpty()
  userId: number;
}
