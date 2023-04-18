import { IsInt, IsNotEmpty } from 'class-validator';

export class UploadFileDto {
  @IsInt()
  @IsNotEmpty()
  year: number;
}
