import { IsNotEmpty, IsDate, IsInt } from 'class-validator';

export class UpdateTakeDayDto {
  @IsNotEmpty()
  @IsInt()
  readonly id: number;

  @IsNotEmpty()
  @IsDate()
  readonly date: Date;
}
