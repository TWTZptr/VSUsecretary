import { IsNotEmpty, IsInt } from 'class-validator';

export class AddTakeDayDto {
  @IsInt()
  @IsNotEmpty()
  employeeId: number;

  @IsInt()
  @IsNotEmpty()
  takeDayId: number;
}
