import { IsOptional, IsNotEmpty, IsInt } from 'class-validator';
import { ToOptionalInt } from 'src/decorators/to-not-blank-int';

export class UpdateGroupDto {
  @IsNotEmpty()
  @IsInt()
  readonly id: number;

  @IsNotEmpty()
  @ToOptionalInt()
  @IsInt()
  readonly educationLevelId?: number;

  @IsOptional()
  @IsInt()
  readonly number?: number;

  @IsOptional()
  @ToOptionalInt()
  @IsInt()
  readonly directionId?: number;
}
