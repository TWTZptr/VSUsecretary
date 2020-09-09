import { IsInt, IsNotEmpty } from 'class-validator';

export class ParseStudentsDto {
  @IsInt()
  @IsNotEmpty()
  directionId: number;

  @IsInt()
  @IsNotEmpty()
  year: number;
}
