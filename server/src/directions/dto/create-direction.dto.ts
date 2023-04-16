import { IsNotEmpty, Length } from 'class-validator';

export class CreateDirectionDto {
  @IsNotEmpty()
  @Length(5, 10)
  readonly code: string;

  @IsNotEmpty()
  readonly fullName: string;

  @IsNotEmpty()
  readonly shortName: string;
}
