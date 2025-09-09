import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwt: JwtService,
  ) {}

  async validateUser(userId: string, password: string): Promise<User | null> {
    return this.usersService.validateUser(userId, password);
  }

  async login(user: User) {
    const payload = { sub: user.id, userId: user.userId };
    return {
      access_token: await this.jwt.signAsync(payload, {
        secret: process.env.JWT_SECRET,
        expiresIn: process.env.JWT_EXPIRES_IN ?? '1d',
      }),
      user: {
        id: user.id,
        userId: user.userId,
        name: user.name,
        createdAt: user.createdAt,
      },
    };
  }
}
