import { IsString, MinLength, MaxLength } from 'class-validator';

export class LoginDto {
  @IsString()
  @MinLength(4)
  @MaxLength(40)
  userId: string;

  @IsString()
  @MinLength(8)
  password: string;
}
