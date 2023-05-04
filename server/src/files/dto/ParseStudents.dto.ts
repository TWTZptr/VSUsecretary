import { IsInt, IsNotEmpty } from 'class-validator';

export class ParseStudentsDto {
  @IsInt()
  @IsNotEmpty()
  year: number;
}
