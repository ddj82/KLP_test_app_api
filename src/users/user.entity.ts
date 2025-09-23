import {
  BeforeInsert,
  BeforeUpdate,
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
  @Column({ type: 'datetime', name: 'created_at', nullable: false })
  createdAt: Date;

  @BeforeInsert()
  setCreatedAt() {
    const now = new Date();
    this.createdAt = now;
    this.updatedAt = now;
  }

  @Column({ type: 'datetime', name: 'updated_at', nullable: false })
  updatedAt: Date;

  @BeforeUpdate()
  setUpdatedAt() {
    this.updatedAt = new Date();
  }
}
