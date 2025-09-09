import { IsString, MinLength, MaxLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MinLength(4)
  @MaxLength(40)
  userId: string; // 아이디

  @IsString()
  @MinLength(4)
  password: string; // 비밀번호

  @IsString()
  @MaxLength(50)
  name: string; // 이름
}
