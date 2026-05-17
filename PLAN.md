# KCOC 진행 계획 / 결정 로그

## 2026-05-17

- 프로젝트 이니셜을 KCOC로 확정했다.
- Cloudflare에서 `kcocoh.org` 도메인을 사용할 도메인으로 정했다.
- OWBCC 운영 하네스 구조를 참고해 `/Users/soliscrew/Library/Mobile Documents/com~apple~CloudDocs/kcocoh` 작업 폴더를 구성했다.
- 기존 `mykoreanchurch.org`는 콘텐츠 참고용으로만 사용하고, 감염 가능성이 있는 WordPress HTML/테마/플러그인은 복사하지 않기로 했다.

## 진행 업데이트

### 2026-05-17 10:12 PDT

- 기존 `mykoreanchurch.org` 공개 메뉴/연락처/메인 문구를 안전하게 재확인했다.
- 기존 HTML에서 `FooterLinks`, `luxurywatches`, `replica watches`, `fake watches` 스팸 흔적이 반복 확인되어, 새 사이트에는 공개 정보만 새 문장으로 재작성하기로 재확인했다.
- 새 사이트 정보 구조 초안을 `content/INFORMATION-ARCHITECTURE.md`에 작성했다.

### 2026-05-17 초기 홈페이지 제작

- `content/INFORMATION-ARCHITECTURE.md`를 기준으로 `site/v1/index.html`을 실제 랜딩 페이지 구조로 교체했다.
- 구성 섹션: Hero, 예배와 말씀, 처음 오신 분 안내, 다음세대와 교육, 공동체와 선교, 주보와 교회소식, 오시는 길.
- 데스크톱 브라우저 시각 검토 후 Hero 제목 줄바꿈, 본문 대비, CTA 문구, 오른쪽 안내 카드 문구를 보정했다.
- 예배 시간과 온라인 예배 링크는 아직 운영 확인이 필요하므로 확정값 대신 방문자 친화 문구로 임시 배치했다.

### 2026-05-17 11:57 PDT

- GitHub repo `kimscomputer/KCOCOH`에 초기 홈페이지 작업을 push했다.
- `kcocoh.org` Zone이 있는 `Joe@solisenginc.com's Account`에 Cloudflare Pages 프로젝트 `kcocoh-site`를 생성했다.
- 운영 Pages subdomain은 `https://kcocoh-site-2im.pages.dev`이다.
- `kcocoh.org`와 `www.kcocoh.org`를 Pages custom domain에 추가하고, 두 DNS record를 `kcocoh-site-2im.pages.dev`로 proxied CNAME 연결했다.
- `https://kcocoh.org/`, `https://www.kcocoh.org/`, `https://kcocoh-site-2im.pages.dev/` 모두 HTTP 200 및 KCOC 핵심 문구 렌더링을 확인했다.
- 작업에 사용된 임시 Cloudflare API 토큰은 노출된 값으로 간주하며, 작업 후 Cloudflare 대시보드에서 삭제/폐기해야 한다.

### 2026-05-17 12:12 PDT

- 제공받은 공식 로고 `image/kcc-logo.png`를 홈페이지 헤더에 반영했다.
- 2026년 5월 17일 주보 이미지 기준으로 주일 장년예배, 주일 영어예배, 수요예배, 새벽기도, 교회학교, 청년부/중고등부/성경공부 시간과 교회 비전/섬기는 사람들 정보를 홈페이지에 반영했다.
- `kcocoh.org`와 `www.kcocoh.org` 라이브 페이지에서 로고 파일과 예배시간/교회정보 문구가 표시되는 것을 확인했다.

### 2026-05-17 12:26 PDT

- 기존 홈페이지 `https://www.mykoreanchurch.org/`에서 공개 이미지/아이콘 자산을 내려받아 `site/v1/media/existing-home/`에 정리했다.
- 메인 히어로 배경과 미디어 섹션에 기존 홈 사진을 적용하고, 공식 YouTube 채널 `https://www.youtube.com/@KoreanChurchofColumbus`와 수요예배 재생목록 `PLuzUYNV8E-aTJhoS5FhvO8s3F0GNBeDWU`를 연결했다.
- 한국어/영어/중국어/스페인어 4개 언어 전환 버튼과 `site/v1/assets/app.js` 번역 스크립트를 추가했다.
- `kcocoh.org`와 `www.kcocoh.org`에서 미디어 섹션, YouTube iframe, 사진 자산, 언어 버튼이 표시되는 것을 확인했다.

## 다음 작업

1. 번역 문구를 교회 공식 표현으로 검수/수정
2. 교회 사진 원본이 더 확보되면 히어로/사역 섹션 이미지 교체 또는 추가
3. 필요 시 `www.kcocoh.org` → `kcocoh.org` canonical redirect 정책 추가
