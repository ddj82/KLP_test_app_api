import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ormconfig } from './config/ormconfig';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { BoardsModule } from './boards/boards.module';
import { RootModule } from './root/root.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({ useFactory: ormconfig }),
    // 업로드 파일 접근: http://<host>:<port>/uploads/...
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads',
    }),
    UsersModule,
    AuthModule,
    BoardsModule,
    RootModule,
  ],
})
export class AppModule {}
