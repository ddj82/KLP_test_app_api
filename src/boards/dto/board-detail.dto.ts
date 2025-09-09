import { UserLiteDto } from '../../users/dto/user-lite.dto';
import { CommentDto } from '../../comments/dto/comment.dto';

export class BoardDetailDto {
  id: number;
  title: string;
  content: string;
  attachments: string[] | null;
  createdAt: Date;
  author: UserLiteDto | null;
  comments: CommentDto[];

  constructor(b: any) {
    this.id = b.id;
    this.title = b.title;
    this.content = b.content;
    this.attachments = b.attachments ?? null;
    this.createdAt = b.createdAt;
    this.author = b.author ? new UserLiteDto(b.author) : null;
    this.comments = (b.comments ?? []).map((c: any) => new CommentDto(c));
  }
}
