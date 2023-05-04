import { IsBoolean, IsInt, IsNotEmpty, IsOptional } from 'class-validator';

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
  readonly directionId: number;

  @IsOptional()
  @IsNotEmpty()
  @IsBoolean()
  readonly complete: boolean;
}
