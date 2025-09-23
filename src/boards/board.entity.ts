import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../users/user.entity';
import { Comment } from '../comments/comment.entity';

@Entity('boards')
export class Board {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 150 })
  title: string;

  @Column({ type: 'text' })
  content: string;

  // 작성자: 로그인 사용자
  @ManyToOne(() => User, { eager: false, onDelete: 'SET NULL' })
  author: User | null;

  // 첨부파일 URL 배열(JSON)
  @Column({ type: 'simple-json', nullable: true, default: null })
  attachments: string[] | null; // 예) ['/uploads/boards/1700000-xxx.png', ...]

  // @CreateDateColumn({ type: 'datetime', name: 'created_at' })
  // createdAt: Date;
  @CreateDateColumn({
    type: 'timestamp',
    precision: 0,
    default: () => 'CURRENT_TIMESTAMP',
    name: 'created_at',
  })
  createdAt: Date;

  @OneToMany(() => Comment, (c) => c.board, { cascade: true })
  comments: Comment[];
}
