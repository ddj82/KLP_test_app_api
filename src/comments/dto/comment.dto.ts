import { UserLiteDto } from '../../users/dto/user-lite.dto';

export class CommentDto {
  id: number;
  content: string;
  attachments: string[] | null;
  createdAt: Date;
  author: UserLiteDto | null;

  constructor(c: any) {
    this.id = c.id;
    this.content = c.content;
    this.attachments = c.attachments ?? null;
    this.createdAt = c.createdAt;
    this.author = c.author ? new UserLiteDto(c.author) : null;
  }
}
