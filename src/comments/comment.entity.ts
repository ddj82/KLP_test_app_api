import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../users/user.entity';
import { Board } from '../boards/board.entity';

@Entity('comments')
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Board, (b) => b.comments, { eager: false, onDelete: 'CASCADE' })
  board: Board;

  @ManyToOne(() => User, { eager: false, onDelete: 'SET NULL' })
  author: User | null;

  @Column({ type: 'text' })
  content: string;

  @Column({ type: 'simple-json', nullable: true, default: null })
  attachments: string[] | null;

  // @CreateDateColumn({ type: 'datetime', name: 'created_at' })
  // createdAt: Date;
  @CreateDateColumn({
    type: 'timestamp',
    precision: 0,
    default: () => 'CURRENT_TIMESTAMP',
    name: 'created_at',
  })
  createdAt: Date;
}
