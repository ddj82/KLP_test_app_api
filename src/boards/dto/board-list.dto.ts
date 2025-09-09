import { UserLiteDto } from '../../users/dto/user-lite.dto';

export class BoardListItemDto {
  id: number;
  title: string;
  content: string;
  attachments: string[] | null;
  createdAt: Date;
  author: UserLiteDto | null;

  constructor(b: any) {
    this.id = b.id;
    this.title = b.title;
    this.content = b.content;
    this.attachments = b.attachments ?? null;
    this.createdAt = b.createdAt;
    this.author = b.author ? new UserLiteDto(b.author) : null;
  }
}

export class BoardListDto {
  items: BoardListItemDto[];
  total: number;
  page: number;
  limit: number;

  constructor(rows: any[], total: number, page: number, limit: number) {
    this.items = rows.map((b) => new BoardListItemDto(b));
    this.total = total;
    this.page = page;
    this.limit = limit;
  }
}
