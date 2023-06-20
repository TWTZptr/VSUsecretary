import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsOptional,
  Length,
} from 'class-validator';

export class UpdateGraduateScriptDto {
  @IsNotEmpty()
  @IsInt()
  readonly id: number;

  @IsOptional()
  @IsNotEmpty()
  readonly date: string;

  @IsOptional()
  @IsNotEmpty()
  @IsInt()
  readonly directionId?: number;

  @IsOptional()
  readonly audience?: string;

  @IsOptional()
  readonly time?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsBoolean()
  readonly complete: boolean;
}
