import { IsDate, IsNotEmpty } from 'class-validator';

export class CreateTakeDayDto {
  @IsNotEmpty()
  @IsDate()
  readonly date: Date;
}
