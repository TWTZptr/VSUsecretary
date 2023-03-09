import { IsInt, IsNotEmpty } from 'class-validator';

export class ChangePasswordDto {
  @IsNotEmpty()
  password: string;

  @IsInt()
  @IsNotEmpty()
  userId: number;
}
