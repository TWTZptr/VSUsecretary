import { IsInt, IsNotEmpty, IsOptional, Max, Min } from 'class-validator';
import { ToOptionalInt } from '../../decorators/to-not-blank-int';

export class CreateGraduateMarksDto {
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
  readonly degreeWorkId: number;
}
