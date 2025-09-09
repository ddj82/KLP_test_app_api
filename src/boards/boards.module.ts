import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Board } from './board.entity';
import { Comment } from '../comments/comment.entity';
import { BoardsService } from './boards.service';
import { BoardsController } from './boards.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Board, Comment])],
  providers: [BoardsService],
  controllers: [BoardsController],
})
export class BoardsModule {}
