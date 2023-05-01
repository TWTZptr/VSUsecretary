import { IsNotEmpty } from 'class-validator';

export class CreateGraduateScriptDto {
  @IsNotEmpty()
  readonly date: string;
}
