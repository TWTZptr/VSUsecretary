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
  @IsDate()
  readonly date: Date;

  @IsOptional()
  @IsNotEmpty()
  @IsBoolean()
  readonly complete: boolean;
}
