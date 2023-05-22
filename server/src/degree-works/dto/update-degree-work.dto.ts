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
  @IsNotEmpty()
  @IsOptional()
  readonly supervisorMarkId?: number;

  @IsInt()
  @IsOptional()
  @IsNotEmpty()
  readonly reviewerMarkId?: number;

  @IsInt()
  @IsOptional()
  @IsNotEmpty()
  readonly markId?: number;

  @ToBoolean()
  @IsOptional()
  @IsNotEmpty()
  readonly implementation?: boolean;

  @IsInt()
  @ToOptionalInt()
  @IsOptional()
  readonly studentId?: number;

  @IsInt()
  @ToOptionalInt()
  @IsOptional()
  readonly supervisorId?: number;

  @IsOptional()
  readonly reviewer?: string;
}
