import { IsInt, IsNotEmpty, IsOptional, Max, Min } from 'class-validator';

export class UpdateGraduateMarksDto {
  @IsInt()
  @IsNotEmpty()
  readonly id: number;

  @IsInt()
  @Min(0)
  @Max(5)
  @IsNotEmpty()
  @IsOptional()
  readonly report?: number;

  @IsInt()
  @Min(0)
  @Max(5)
  @IsNotEmpty()
  @IsOptional()
  readonly presentation?: number;

  @IsInt()
  @Min(0)
  @Max(5)
  @IsNotEmpty()
  @IsOptional()
  readonly questions?: number;

  @IsInt()
  @Min(0)
  @Max(5)
  @IsNotEmpty()
  @IsOptional()
  readonly appearance?: number;

  @IsInt()
  @Min(0)
  @Max(5)
  @IsNotEmpty()
  @IsOptional()
  readonly final?: number;

  @IsInt()
  @IsNotEmpty()
  @IsOptional()
  readonly degreeWorkId?: number;
}
