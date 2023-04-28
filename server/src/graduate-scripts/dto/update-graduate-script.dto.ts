import {
  IsNotEmpty,
  IsDate,
  IsInt,
  IsOptional,
  IsBoolean,
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
  @IsBoolean()
  readonly complete: boolean;
}
