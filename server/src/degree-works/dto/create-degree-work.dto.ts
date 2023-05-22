import { IsInt, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
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
  @IsNotEmpty()
  readonly supervisorMarkId: number;

  @IsOptional()
  readonly reviewer?: string;

  @IsInt()
  @IsNotEmpty()
  @IsOptional()
  readonly reviewerMarkId?: number;

  @IsInt()
  @IsNotEmpty()
  @IsOptional()
  readonly markId?: number;

  @ToBoolean()
  @IsNotEmpty({ message: INVALID_IMPLEMENTATION_BOOLEAN_VALUE_MSG })
  readonly implementation: boolean;

  @IsInt()
  @IsNotEmpty()
  readonly studentId: number;

  @IsInt()
  @ToOptionalInt()
  @IsOptional()
  readonly supervisorId?: number;
}
