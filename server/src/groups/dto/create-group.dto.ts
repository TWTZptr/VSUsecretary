import { IsNotEmpty, IsInt, IsOptional } from 'class-validator';
import { ToOptionalInt } from 'src/decorators/to-not-blank-int';

export class CreateGroupDto {
  @IsInt()
  @IsNotEmpty()
  readonly number: number;

  @IsNotEmpty()
  readonly educationLevel: string;

  @IsInt()
  @ToOptionalInt()
  @IsOptional()
  readonly directionId?: number;
}