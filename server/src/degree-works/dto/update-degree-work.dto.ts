import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  Max,
  Min,
} from 'class-validator';
import { ToBoolean } from 'src/decorators/to-boolean';
import { ToOptionalInt } from 'src/decorators/to-not-blank-int';

export class UpdateDegreeWorkDto {
  @IsInt()
  @IsNotEmpty()
  readonly id: number;

  @IsNotEmpty()
  @IsOptional()
  readonly theme?: string;

  @IsInt()
  @IsNotEmpty()
  @IsOptional()
  readonly pagesNumber?: number;

  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  readonly originality?: number;

  @IsInt()
  @Min(0)
  @Max(5)
  @IsNotEmpty()
  @IsOptional()
  readonly supervisorMark?: number;

  @IsInt()
  @Min(0)
  @Max(5)
  @IsNotEmpty()
  @IsOptional()
  readonly reviewerMark?: number;

  @ToBoolean()
  @IsOptional()
  readonly implementation?: boolean;

  @IsInt()
  @ToOptionalInt()
  @IsOptional()
  readonly studentId?: number;

  @IsInt()
  @ToOptionalInt()
  @IsOptional()
  readonly supervisorId?: number;

  @IsNotEmpty()
  @IsOptional()
  readonly reviewer?: string;
}
