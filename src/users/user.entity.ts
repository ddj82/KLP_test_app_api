import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
@Unique(['userId'])
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 40 })
  userId: string; // 아이디

  @Column()
  passwordHash: string; // 비밀번호

  @Column({ length: 50 })
  name: string; // 이름

  // @CreateDateColumn({ type: 'datetime', name: 'created_at' })
  // createdAt: Date;
  //
  // @UpdateDateColumn({ type: 'datetime', name: 'updated_at' })
  // updatedAt: Date;
  @CreateDateColumn({
    type: 'timestamp',
    precision: 0,
    default: () => 'CURRENT_TIMESTAMP',
    name: 'created_at',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    precision: 0,
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
    name: 'updated_at',
  })
  updatedAt: Date;
}
