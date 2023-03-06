import { IsNotEmpty, IsOptional, Length, IsInt } from 'class-validator';

export class UpdateDirectionDto {
  @IsInt()
  @IsNotEmpty()
  readonly id: number;

  @IsOptional()
  @Length(5, 10)
  readonly code?: string;

  @IsOptional()
  readonly fullName?: string;

  @IsOptional()
  readonly shortName?: string;
}
