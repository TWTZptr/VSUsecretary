import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsInt,
  Min,
  Max,
} from 'class-validator';
import { ToBoolean } from 'src/decorators/to-boolean';
import { ToOptionalInt } from 'src/decorators/to-not-blank-int';
import { INVALID_IMPLEMENTATION_BOOLEAN_VALUE_MSG } from '../constants';

export class CreateDegreeWorkDto {
  @IsNotEmpty()
  readonly theme: string;

  @IsInt()
  @IsNotEmpty()
  readonly pagesNumber: number;

  @IsNumber()
  @IsNotEmpty()
  readonly originality: number;

  @IsInt()
  @Min(0)
  @Max(5)
  @IsNotEmpty()
  readonly supervisorMark: number;

  @IsInt()
  @Min(0)
  @Max(5)
  @IsNotEmpty()
  @IsOptional()
  readonly reviewerMark?: number;

  @IsInt()
  @Min(0)
  @Max(5)
  @IsNotEmpty()
  @IsOptional()
  readonly mark?: number;

  @ToBoolean()
  @IsNotEmpty({ message: INVALID_IMPLEMENTATION_BOOLEAN_VALUE_MSG })
  readonly implementation: boolean;

  @IsInt()
  @ToOptionalInt()
  @IsOptional()
  readonly studentId?: number;

  @IsInt()
  @ToOptionalInt()
  @IsOptional()
  readonly reviewerId?: number;

  @IsInt()
  @ToOptionalInt()
  @IsOptional()
  readonly supervisorId?: number;

  @IsInt()
  @IsOptional()
  @ToOptionalInt()
  readonly takeDayId?: number;
}
