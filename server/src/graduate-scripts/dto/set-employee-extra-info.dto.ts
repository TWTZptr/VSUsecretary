import { IsOptional } from 'class-validator';

export class SetEmployeeExtraInfoDto {
  @IsOptional()
  readonly academicDegree?: string;

  @IsOptional()
  readonly academicRank?: string;

  @IsOptional()
  readonly position?: string;

  @IsOptional()
  readonly anotherJob?: string;
}
