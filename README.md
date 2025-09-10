# Test App API

TestApp 모바일 애플리케이션의 백엔드 API 서버입니다. NestJS와 TypeORM을 기반으로 구축되었습니다.

## 📋 프로젝트 개요

React Native + Expo로 개발된 TestApp의 백엔드 API를 제공하는 NestJS 애플리케이션입니다. JWT 인증, 파일 업로드, 게시판 기능 등을 지원합니다.

## 🛠 기술 스택

- **Framework**: NestJS 11.x
- **Language**: TypeScript 5.x
- **Database**: MySQL 8.x
- **ORM**: TypeORM 0.3.x
- **Authentication**: JWT (Passport)
- **Validation**: class-validator, class-transformer
- **File Upload**: Multer
- **Password Hashing**: bcrypt

## ⚙️ 설치 및 실행

### 필수 요구사항
- Node.js (18 이상)
- MySQL 8.0 이상
- npm 또는 yarn

### 환경 설정
`.env` 파일을 생성하고 다음 내용을 설정하세요:

```env
# 서버 포트
PORT=7979

# 데이터베이스 설정
DB_HOST=localhost
DB_PORT=3306
DB_USER=
DB_PASS=
DB_NAME=test_app

# JWT 설정
JWT_SECRET=super_secret_key_change_me
JWT_EXPIRES_IN=1d
```

### 데이터베이스 설정
MySQL에서 데이터베이스를 생성하세요:

```sql
CREATE DATABASE test_app CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### 설치 및 실행
```bash
# 의존성 설치
npm install

# 개발 모드 실행 (파일 변경 감지)
npm run start:dev

# 프로덕션 빌드
npm run build

# 프로덕션 모드 실행
npm run start:prod
```

## 🌐 API 서버 정보

- **포트**: 7979
- **Base URL**: `http://localhost:7979/api`
- **CORS**: 모든 오리진 허용 (개발 환경)
- **전역 Prefix**: `/api`

### 모바일 앱 연결
- **iOS 시뮬레이터**: `http://localhost:7979/api`
- **Android 에뮬레이터**: `http://10.0.2.2:7979/api`
- **물리 디바이스**: `http://[YOUR_IP]:7979/api`

## 📁 프로젝트 구조

```
src/
├── auth/                   # 인증 모듈
│   ├── dto/               # 로그인 DTO
│   ├── strategies/        # Passport 전략 (JWT, Local)
│   ├── auth.controller.ts
│   ├── auth.service.ts
│   └── auth.module.ts
├── users/                  # 사용자 관리 모듈
│   ├── dto/               # 사용자 DTO
│   ├── user.entity.ts     # 사용자 엔티티
│   ├── users.controller.ts
│   ├── users.service.ts
│   └── users.module.ts
├── boards/                 # 게시판 모듈
│   ├── dto/               # 게시글 DTO
│   ├── board.entity.ts    # 게시글 엔티티
│   ├── boards.controller.ts
│   ├── boards.service.ts
│   └── boards.module.ts
├── comments/               # 댓글 모듈
│   ├── dto/               # 댓글 DTO
│   └── comment.entity.ts  # 댓글 엔티티
├── common/                 # 공통 유틸리티
│   └── upload/            # 파일 업로드 설정
├── config/                 # 설정 파일
│   └── ormconfig.ts       # TypeORM 설정
├── types/                  # TypeScript 타입 정의
├── app.module.ts          # 루트 모듈
└── main.ts               # 애플리케이션 진입점
```

## 🔗 주요 API 엔드포인트

### 인증 (Authentication)
- `POST /api/auth/login` - 로그인
- `POST /api/auth/register` - 회원가입

### 사용자 (Users)
- `GET /api/users/me` - 내 프로필 조회

### 게시판 (Boards)
- `GET /api/boards` - 게시글 목록 조회
- `GET /api/boards/:id` - 게시글 상세 조회
- `POST /api/boards` - 게시글 작성 (파일 첨부 지원)

## 🔒 인증 시스템

### JWT 토큰 방식
- **액세스 토큰**: 1일 유효
- **Bearer 토큰**: `Authorization: Bearer <token>`

### Passport 전략
- **Local Strategy**: 로그인 시 사용자명/비밀번호 검증
- **JWT Strategy**: API 요청 시 토큰 검증

## 💾 데이터베이스 스키마

### Users 테이블
- id (Primary Key)
- username (Unique)
- password (Hashed)
- createdAt, updatedAt

### Boards 테이블
- id (Primary Key)
- title
- content
- attachments (JSON - 첨부파일 경로 목록)
- author (User 관계)
- createdAt, updatedAt

### Comments 테이블
- id (Primary Key)
- content
- board (Board 관계)
- author (User 관계)
- createdAt, updatedAt

## 🧪 테스트

```bash
# 단위 테스트
npm run test

# E2E 테스트
npm run test:e2e

# 테스트 커버리지
npm run test:cov

# 테스트 감시 모드
npm run test:watch
```

## 📤 파일 업로드

### 게시글 첨부 파일
- **첨부 방식**: `POST /api/boards` API에서 multipart/form-data로 처리
- **필드명**: `files` (이미지 파일 배열)
- **처리 방식**: FilesInterceptor를 사용하여 백엔드 디렉토리에 저장
- **저장 위치**: 백엔드 `/uploads` 디렉토리
- **DB 저장**: 파일 경로들을 boards.attachments 컬럼에 JSON 배열로 저장


## 🚀 배포

### 프로덕션 빌드
```bash
npm run build
npm run start:prod
```

### 환경별 설정
- **개발환경**: `synchronize: true` (자동 스키마 동기화)
- **프로덕션**: `synchronize: false` (수동 마이그레이션 권장)

## 🔧 개발 가이드

### 새로운 모듈 추가
```bash
# NestJS CLI 사용
nest generate module [module-name]
nest generate controller [module-name]
nest generate service [module-name]
```

### 엔티티 생성
TypeORM 엔티티를 생성하고 `ormconfig.ts`의 entities 배열에 추가하세요.

### DTO 유효성 검사
class-validator를 사용하여 요청 데이터를 검증합니다:

```typescript
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateBoardDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  content: string;
}
```

## 🛡️ 보안 고려사항

- JWT 시크릿 키를 안전하게 관리하세요
- 비밀번호는 bcrypt로 해싱됩니다
- CORS 설정을 프로덕션 환경에 맞게 조정하세요
- 입력값 검증을 위해 ValidationPipe를 사용합니다

## 📝 코드 품질

- **ESLint**: 코드 스타일 검사
- **Prettier**: 코드 포맷팅
- **TypeScript**: 타입 안정성

```bash
# 린트 검사
npm run lint

# 코드 포맷팅
npm run format
```

## 🔄 프론트엔드 연동

이 API는 [TestApp](../testApp) React Native 애플리케이션과 연동됩니다.

### 연결 설정
TestApp의 `app.json`에서 API 엔드포인트가 설정되어 있습니다:
- iOS 시뮬레이터: `http://localhost:7979/api`
- Android 에뮬레이터: `http://10.0.2.2:7979/api`
- **물리 디바이스**: `http://[YOUR_IP]:7979/api`

---
**연관 프로젝트**: [TestApp Frontend](../testApp)
