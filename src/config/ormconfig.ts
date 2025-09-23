import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from '../users/user.entity';
import { Board } from '../boards/board.entity';

export const ormconfig = (): TypeOrmModuleOptions => ({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT ?? 3306),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: [User, Board],
  autoLoadEntities: true, // forFeature에 등록한 엔티티 자동 로드
  // synchronize: true, // 개발용에서만 true (운영은 false)
  synchronize: process.env.NODE_ENV !== 'production', // 프로덕션에서는 false
  // logging: ['error', 'warn', 'schema'], // 테이블 생성 로그 눈으로 확인
  charset: 'utf8mb4',
});
