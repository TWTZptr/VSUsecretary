import { IsDate, IsNotEmpty } from 'class-validator';

export class CreateGraduateScriptDto {
  @IsNotEmpty()
  @IsDate()
  readonly date: string;
}
