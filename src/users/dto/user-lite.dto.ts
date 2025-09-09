export class UserLiteDto {
  id: number;
  userId: string;
  userName: string;

  constructor(u: { id: number; userId: string; name: string } | null | undefined) {
    this.id = u?.id ?? 0;
    this.userId = u?.userId ?? '';
    this.userName = u?.name ?? '';
  }
}
