import { Injectable } from '@nestjs/common';

@Injectable()
export class RootService {
  health() {
    return {
      ok: true,
      message: 'NestJS root test endpoint',
      timestamp: new Date().toISOString(),
      // 필요 시 버전/빌드 정보도 포함하세요
      version: '1.0.0',
    };
  }
}
