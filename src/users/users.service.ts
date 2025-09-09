import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private readonly repo: Repository<User>) {}

  async create(dto: CreateUserDto): Promise<User> {
    const exists = await this.repo.findOne({ where: { userId: dto.userId } });
    if (exists) throw new ConflictException('이미 존재하는 아이디입니다.');

    const passwordHash = await bcrypt.hash(dto.password, 12);
    const user = this.repo.create({ userId: dto.userId, name: dto.name, passwordHash });
    return this.repo.save(user);
  }

  async findByUserId(userId: string): Promise<User> {
    const user = await this.repo.findOne({ where: { userId } });
    if (!user) throw new NotFoundException('사용자를 찾을 수 없습니다.');
    return user;
  }

  // 로그인 검증용(있는 경우만 null 없이 반환)
  async validateUser(userId: string, password: string): Promise<User | null> {
    const user = await this.repo.findOne({ where: { userId } });
    if (!user) return null;
    const ok = await bcrypt.compare(password, user.passwordHash);
    return ok ? user : null;
  }
}
