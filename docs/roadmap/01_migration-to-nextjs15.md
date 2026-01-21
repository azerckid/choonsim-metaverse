# 01_migration-to-nextjs15.md

이 문서는 기존 React 프로젝트(v18)를 최신 Next.js 15(App Router) 및 React 19 환경으로 마이그레이션하기 위한 상세 로드맵을 정의합니다.

## 1. 개요 (Overview)
기존 프로젝트는 `react-scripts`와 `styled-components`를 사용하여 구축되었습니다. 3D 메타버스 환경의 성능 최적화와 최신 웹 표준 준수를 위해 프레임워크 및 스타일링 시스템을 전면 교체합니다.

## 2. 주요 아키텍처 변화 (Core Architecture Changes)
- **Framework**: Create React App (Webpack) -> Next.js 15 (Turbopack/App Router)
- **Styling**: styled-components -> Tailwind CSS v4 (Zero-runtime)
- **State Management**: Recoil -> Zustand (Lightweight & Performance focused)
- **Type System**: JavaScript -> TypeScript (Stability)
- **3D Utilities**: @react-three/fiber & drei (Latest versions)

## 3. 새로운 폴더 구조 (Proposed Folder Structure)
```text
/
├── app/                      # Next.js App Router (루트)
│   ├── layout.tsx            # 전역 레이아웃 및 Providers
│   ├── page.tsx              # 메타버스 메인 월드
│   └── globals.css           # Tailwind v4 설정
├── components/               # 재사용 컴포넌트
│   ├── 3d/                   # R3F 전용 (Character, Environment, Interaction)
│   ├── ui/                   # shadcn/ui (HUD, Interface)
│   └── providers/            # Client Context Providers
├── hooks/                    # 커스텀 훅 (Input, Socket 연동)
├── store/                    # Zustand Store
├── lib/                      # 유틸리티 (Socket Singletons, Constants)
├── public/                   # 3D 에셋 (.glb, .ogg, .mp4)
└── types/                    # TypeScript 인터페이스
```

## 4. 상세 로드맵 (Detailed Roadmap)

### Phase 1: 기반 구축 (Foundation)
- Next.js 15 (v15.1.0) 초기화
- TypeScript 환경 구성
- Tailwind CSS v4 설치 및 기존 CSS 토큰 이관
- `.gitignore` 및 환경 변수 설정

### Phase 2: 인프라 마이그레이션 (Infrastructure)
- **Socket.io-client** 연동: Client Component 내 싱글톤 패턴 적용
- **Zustand** 설정: 3D 동기화에 필요한 빈번한 상태 변화 처리 최적화
- 기존 Recoil 상태 이관 (keyPressed, playerPosition 등)

### Phase 3: 3D 환경 및 에셋 마이그레이션 (3D Assets)
- `public/` 에셋 이동 및 최적화
- `src/components/Envirionment` 및 `src/scene` 리팩토링
- @react-three/fiber 9.0 및 drei 10.0 기반 코드 업데이트

### Phase 4: 캐릭터 시스템 및 물리 엔진 (Character & Physics)
- `@react-three/cannon` (v6.6.0) 업데이트 및 충돌 로직 검증
- 캐릭터 조작 시스템 (WASD) 및 카메라 컨트롤 최적화

### Phase 5: 프리미엄 UI 및 최종 폴리싱 (Premium UI)
- `shadcn/ui` 기반 채팅 및 상태창 UI 구현
- Framer Motion을 활용한 부드러운 전환 인터랙션 추가

## 5. 기대 효과 (Expected Outcomes)
- **로딩 성능**: Next.js의 스트리밍 및 최적화된 에셋 서빙으로 초기 로딩 속도 향상
- **런타임 성능**: Zero-runtime CSS(Tailwind)와 가벼운 상태 관리(Zustand)로 프레임 드랍 최소화
- **유지 보수**: TypeScript 적용으로 코드 안정성 및 협업 효율 증대
