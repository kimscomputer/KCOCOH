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

### 2026-05-17 13:05 PDT

- Bridgetown Church, Passion City Church, Life.Church, Redeemer, 사랑의교회, 온누리교회, KCPC, 나성영락교회, Jubilee Seoul, Seoul Union Church 등을 참고해 KCOC 디자인 원칙을 정리했다.
- 디자인 에이전트 하네스에 촌스러운 장식성 이모티콘 금지, 리서치 기반 프리미엄 디자인 프로세스, 데스크톱/모바일 검증 원칙을 추가했다.
- 홈페이지를 크림/차콜/브론즈 팔레트, 실제 사진 기반 히어로, 예배 정보 패널, 절제된 카드, 고급 미디어 섹션 중심으로 재구성했다.
- 한국어/영어/중국어/스페인어 주요 방문자 문구와 주소/연락처 표시를 보강했다.

## 다음 작업

1. Cloudflare Pages 운영 계정에서 R2/KV 또는 D1 바인딩을 연결해 실제 업로드 저장 활성화
2. 번역 문구를 교회 공식 표현으로 최종 검수
3. 교회 사진 원본이 더 확보되면 히어로/사역 섹션 이미지 교체 또는 추가
4. 필요 시 `www.kcocoh.org` → `kcocoh.org` canonical redirect 정책 추가


### 2026-05-17 13:20 PDT

- 사용자의 피드백에 따라 첫 화면이 너무 어둡고 사진이 식별되지 않는 문제를 수정했다.
- Hero를 밝은 크림/화이트 기반으로 바꾸고, 실제 예배당 사진이 오른쪽에서 보이도록 오버레이를 낮췄다.
- Hero와 섹션 제목의 최대 글자 크기를 낮춰 타이틀이 과도하게 커 보이지 않게 조정했다.
- `site/v1/admin/`에 관리 페이지 UI를 추가하고, `site/v1/functions/api/admin/content.js`에 Cloudflare Pages Functions 기반 관리 API 스캐폴드를 추가했다.
- 원격 쓰기는 Cloudflare Access와 D1/KV 바인딩이 연결되기 전까지 안전하게 비활성화된다.

### 2026-05-17 14:05 PDT

- 사랑의교회, 온누리교회, 영락교회, Life.Church, Redeemer, Jubilee Seoul 등 공개 교회 사이트의 헤드카피 패턴을 다시 확인하고, KCOC 문구를 예배/말씀/공동체/복음/다음세대 중심의 교회 언어로 보정했다.
- Hero 문구를 `예수 그리스도의 사랑으로 / 여러분을 환영합니다`로 의미 단위 줄바꿈 처리하고, 한국어/영어/중국어/스페인어 주요 문구를 함께 수정했다.
- 공개 페이지에 `교회 앨범` 섹션과 `주보와 교회 소식` 웹 뷰어 구조를 추가했다. 사진은 대표 이미지 + 썸네일 그리드, 주보는 PDF iframe 또는 이미지 뷰어 + 다운로드 링크 패턴으로 렌더링된다.
- 관리자 페이지에 `사진 업로드`와 `주보 업로드` 탭을 추가했고, Pages Functions API `/api/admin/media`, `/api/admin/bulletins`, `/api/media/gallery`, `/api/bulletins`를 준비했다.
- 실제 원격 업로드에는 Cloudflare Access, R2 `KCOC_MEDIA`, KV `KCOC_CONTENT` 또는 D1 `DB`, 공개 URL 변수 `KCOC_MEDIA_PUBLIC_URL` 연결이 필요하다.
- 현재 프로젝트/문서/코드에서 Figma 연결 흔적은 확인되지 않았다. Figma 연동은 별도 MCP/플러그인/토큰 설정이 필요한 후속 작업이다.

### 2026-05-17 14:40 PDT

- 사용자 피드백: 첫 화면과 섹션 타이틀이 필요 이상으로 크고 전체 디자인 균형을 무너뜨린다는 지적.
- 홈페이지 전체 타이포그래피 스케일을 다시 낮췄다. H1 최대값을 42px, H2 최대값을 35px 수준으로 줄이고, body/lead/button/service/info-strip/card 타이포그래피와 여백을 함께 줄여 한 요소만 튀지 않도록 조정했다.
- 연락처 바는 폭, 내부 padding, 그림자, 글자 크기를 줄여 히어로 아래에서 과도하게 무겁지 않게 정리했다.
- 모바일은 390px CDP viewport에서 hero/card/button/service panel의 오른쪽 overflow가 없도록 hero margin, 내부 padding, min-width, overflow-x를 보정했다. 측정값 기준 document/body scrollWidth는 390px이고 hero/right edge는 370px으로 viewport 안에 들어온다. 가로 내비게이션 항목만 의도적으로 스크롤된다.

### 2026-05-17 15:25 PDT

- 관리자 페이지에 비밀번호 기반 로그인 흐름을 추가했다.
- `/admin/` 아래 모든 정적 관리 화면은 Pages Functions middleware에서 인증 세션이 없으면 `/admin/login/`으로 302 redirect한다.
- 새 API: `/api/admin/auth` GET/POST. POST 로그인 성공 시 `HttpOnly; Secure; SameSite=Lax` 세션 쿠키를 발급하고, `action: logout`으로 로그아웃한다.
- 기존 `/api/admin/content`, `/api/admin/media`, `/api/admin/bulletins` 관리자 API는 Cloudflare Access 세션 또는 비밀번호 로그인 세션 중 하나가 있어야 접근/업로드 가능하도록 통합했다.
- 로컬 검증: `wrangler pages dev`에서 `/admin/` 미인증 접근은 로그인으로 redirect, 잘못된 비밀번호는 401, 올바른 비밀번호는 `/admin/` 진입, 로그아웃 후 로그인 화면 복귀 확인.
- 운영 적용에는 Cloudflare Pages 환경변수/secret `ADMIN_PASSWORD` 또는 `ADMIN_PASSWORD_SHA256`, `ADMIN_SESSION_SECRET`, 선택적으로 `ADMIN_SESSION_MAX_AGE` 설정 후 배포가 필요하다. 이번에 생성한 관리자 비밀번호는 Git 밖의 `~/kcoc-admin-login.txt`에 0600 권한으로 저장했다.

### 2026-05-17 16:15 PDT

- 관리자 로그인 기능 운영 배포 완료: Cloudflare Pages `kcocoh-site` production secrets `ADMIN_PASSWORD`, `ADMIN_SESSION_SECRET`, `ADMIN_SESSION_MAX_AGE`를 설정한 뒤 배포했다.
- 최종 배포 URL: `https://8006d377.kcocoh-site-2im.pages.dev`; custom domains `https://kcocoh.org/admin/`, `https://www.kcocoh.org/admin/` 모두 미인증 접근 시 `/admin/login/`으로 302 redirect 확인.
- 라이브 검증: `/admin/login/` 200 및 `관리자 로그인` marker 확인, `/api/admin/auth` 미인증 401 및 `passwordLoginConfigured: true` 확인, 비밀번호 로그인 200, 로그인 쿠키로 `/api/admin/content` 200 및 content 반환 확인.
- 브라우저 시각 검증: `https://kcocoh.org/admin/` 접속 시 로그인 카드/비밀번호 입력/로그인 버튼이 정상 표시된다.
- 배포 후 `/tmp/kcocoh_cf_token` 삭제 완료. 관리자 비밀번호 파일 `~/kcoc-admin-login.txt`는 사용자가 관리 페이지에 로그인할 수 있도록 유지한다.

### 2026-05-17 16:40 PDT

- 관리자 페이지에 관리자 계정 관리 기능을 추가했다.
- `/admin/` 왼쪽 메뉴에 `관리자 / Users` 탭을 추가하고, 관리자 이름/이메일 아이디/권한/임시 비밀번호로 새 관리자를 추가할 수 있게 했다.
- 관리자 목록에서 활성/비활성 토글, 비밀번호 변경, 삭제 버튼을 제공한다. 이 작업은 최고 관리자(`owner`) 세션에서만 허용된다.
- 새 API `/api/admin/users`를 추가했다. GET/POST/PUT/DELETE를 지원하며 `KCOC_CONTENT` KV 또는 `DB` D1 바인딩을 저장소로 사용한다.
- 로그인 API `/api/admin/auth`는 기존 초기 관리자 비밀번호 로그인과 새 관리자 이메일+비밀번호 로그인을 모두 지원한다. 기존 `ADMIN_PASSWORD`는 백업/초기 최고 관리자 로그인으로 유지한다.
- 새 관리자 비밀번호는 salt 포함 SHA-256 해시로 저장하고 원문은 저장하지 않는다. 세션 쿠키에는 type/id/username/name/role 정보를 HMAC 서명한 v2 payload로 넣는다.
- 로컬 검증: `wrangler pages dev --kv KCOC_CONTENT`에서 `/admin/` 미인증 redirect, 초기 관리자 로그인, 관리자 추가, 추가 관리자 이메일 로그인, 관리자 탭 표시를 확인했다.
- 운영 배포에는 Cloudflare 토큰이 다시 필요하며, 운영에서 계정 관리가 실제 저장되려면 Pages 프로젝트에 `KCOC_CONTENT` KV 또는 `DB` D1 바인딩이 연결되어 있어야 한다.
