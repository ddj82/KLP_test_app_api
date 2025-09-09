import { IsString, MaxLength, MinLength } from 'class-validator';

export class CreateBoardDto {
  @IsString()
  @MinLength(1)
  @MaxLength(150)
  title: string;

  @IsString()
  @MinLength(1)
  content: string;
}
