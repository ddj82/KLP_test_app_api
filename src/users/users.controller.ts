import { Body, Controller, Post, Get, UseGuards, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthGuard } from '@nestjs/passport';
import express from 'express';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('signup')
  async signup(@Body() dto: CreateUserDto) {
    const user = await this.usersService.create(dto);
    return {
      id: user.id,
      userId: user.userId,
      name: user.name,
      createdAt: user.createdAt,
    };
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  me(@Req() req: express.Request) {
    return req.user; // 타입 안전
  }
}
