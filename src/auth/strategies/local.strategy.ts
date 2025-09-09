import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { User } from '../../users/user.entity';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({ usernameField: 'userId', passwordField: 'password' });
  }

  async validate(userId: string, password: string): Promise<User> {
    const user = await this.authService.validateUser(userId, password);
    if (!user) throw new UnauthorizedException('아이디 또는 비밀번호가 올바르지 않습니다.');
    return user;
  }
}
