import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // CORS
  app.enableCors({
    origin: [
      // 웹 클라이언트가 있을 경우 도메인 추가
      // 물리 디바이스/에뮬레이터에서 오는 요청은 * 로 열어도 무방(개발)
      '*',
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  app.setGlobalPrefix('api'); // /api/... 로 통일
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  // ★ 물리 기기 연결을 위해 0.0.0.0 바인딩
  await app.listen(process.env.PORT ?? 7979, '0.0.0.0');
}
bootstrap();
