import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  UseGuards,
  UploadedFiles,
  UseInterceptors,
  Req,
  ParseIntPipe,
} from '@nestjs/common';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { AuthGuard } from '@nestjs/passport';
import { FilesInterceptor } from '@nestjs/platform-express';
import { boardUploadOptions, commentUploadOptions } from '../common/upload/multer-options';
import { CreateCommentDto } from '../comments/dto/create-comment.dto';
import express from 'express';

@Controller('boards')
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}

  @Get()
  async list(@Query('page') page = '1', @Query('limit') limit = '10') {
    return this.boardsService.findAll(Number(page), Number(limit));
  }

  @Get(':id')
  async detail(@Param('id', ParseIntPipe) id: number) {
    return this.boardsService.findOne(id);
  }

  // 게시글 작성 (JWT 필요) + 첨부파일
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(FilesInterceptor('files', 10, boardUploadOptions))
  @Post()
  async create(
    @Body() dto: CreateBoardDto,
    @UploadedFiles() files: Express.Multer.File[],
    @Req() req: express.Request,
  ) {
    console.log('dto', dto);
    console.log('files', files);

    const fileUrls = (files ?? []).map((f) => `/uploads/boards/${f.filename}`);
    // req.user는 JwtStrategy.validate에서 return한 객체 형식 사용
    const author = (req as any).user?.id ? { id: (req as any).user.id } : null;
    // author를 실제 User 엔티티로 바인딩하려면 UsersService로 조회해서 주입해도 됩니다.
    return this.boardsService.create(dto, author as any, fileUrls);
  }

  // 댓글 작성 (JWT 필요) + 첨부파일
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(FilesInterceptor('files', 10, commentUploadOptions))
  @Post(':id/comments')
  async addComment(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: CreateCommentDto,
    @UploadedFiles() files: Express.Multer.File[],
    @Req() req: express.Request,
  ) {
    const fileUrls = (files ?? []).map((f) => `/uploads/comments/${f.filename}`);
    const author = (req as any).user?.id ? { id: (req as any).user.id } : null;
    return this.boardsService.addComment(id, author as any, dto.content, fileUrls);
  }
}
