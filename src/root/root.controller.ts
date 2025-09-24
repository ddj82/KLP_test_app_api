import { Controller, Get } from '@nestjs/common';
import { RootService } from './root.service';

@Controller('root') // 빈 값이면 컨트롤러의 기본 경로는 '/'가 됩니다.
export class RootController {
  constructor(private readonly rootService: RootService) {}

  @Get() // 경로를 비우면 '/'에 매핑됩니다.
  getRoot() {
    return this.rootService.health();
  }
}
