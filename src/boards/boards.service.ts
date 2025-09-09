import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from './board.entity';
import { Repository } from 'typeorm';
import { CreateBoardDto } from './dto/create-board.dto';
import { User } from '../users/user.entity';
import { Comment } from '../comments/comment.entity';
import { BoardListDto } from './dto/board-list.dto';
import { BoardDetailDto } from './dto/board-detail.dto';

type AuthorLite = {
  id: number;
  userId: string;
  userName: string;
} | null;

function toAuthorLite(u: User | null): AuthorLite {
  return u ? { id: u.id, userId: u.userId, userName: u.name } : null;
}

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(Board) private readonly boards: Repository<Board>,
    @InjectRepository(Comment) private readonly comments: Repository<Comment>,
  ) {}

  async create(dto: CreateBoardDto, author: User | null, attachments: string[]) {
    const board = this.boards.create({
      title: dto.title,
      content: dto.content,
      author,
      attachments: attachments.length ? attachments : null,
    });
    return this.boards.save(board);
  }

  async findAll(page = 1, limit = 10) {
    const [rows, total] = await this.boards.findAndCount({
      relations: { author: true },
      order: { createdAt: 'DESC' },
      skip: (page - 1) * limit,
      take: limit,
    });

    return new BoardListDto(rows, total, page, limit);
  }

  async findOne(id: number) {
    const board = await this.boards.findOne({
      where: { id },
      relations: { author: true, comments: { author: true } }, // 댓글 + 댓글 작성자
    });
    if (!board) throw new NotFoundException('게시글을 찾을 수 없습니다.');

    return new BoardDetailDto(board);
  }

  async addComment(boardId: number, author: User | null, content: string, attachments: string[]) {
    const board = await this.boards.findOne({ where: { id: boardId } });
    if (!board) throw new NotFoundException('게시글을 찾을 수 없습니다.');

    const comment = this.comments.create({
      board,
      author,
      content,
      attachments: attachments.length ? attachments : null,
    });
    return this.comments.save(comment);
  }
}
