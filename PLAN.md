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

### 2026-05-17 16:50 PDT

- 관리자 계정 관리 코드 운영 배포 완료: `https://546cbfb9.kcocoh-site-2im.pages.dev`가 `https://kcocoh.org/admin/`에 반영됐다.
- 라이브 검증: `/admin/` 미인증 302 redirect, `/admin/login/` 200 및 `관리자 이메일 아이디` 표시, 초기 관리자 비밀번호 로그인 200, `/api/admin/users` owner 세션 접근 200 확인.
- 현재 운영 `/api/admin/users` 응답은 `store: not_configured`, `writable: false`이다. 즉 UI와 API는 배포됐지만 실제 관리자 추가 저장은 아직 비활성이다.
- 원인: 현재 `/tmp/kcocoh_cf_token` 토큰은 Pages 프로젝트 조회/배포에는 성공하지만 KV/D1 list/create API에서 `Authentication error`가 발생한다. `KCOC_CONTENT` KV namespace 생성/바인딩을 위해서는 KV Storage Edit 또는 D1 Edit 권한이 포함된 Joe@solisenginc.com 계정 토큰이 필요하다.
- 배포 후 `/tmp/kcocoh_cf_token` 삭제 완료.

### 2026-05-17 17:00 PDT

- 새 Cloudflare API 토큰으로 `KCOC_CONTENT` KV namespace를 생성하고 Pages 프로젝트 `kcocoh-site` production/preview에 바인딩했다.
- 최종 배포 URL: `https://6d4b5fc3.kcocoh-site-2im.pages.dev`.
- 운영 `https://kcocoh.org/admin/` 검증 결과 `/api/admin/users`가 `store: kv`, `writable: true`로 전환됐다.
- 라이브에서 초기 관리자 로그인, 임시 관리자 등록, 새 관리자 이메일 로그인, 권한 변경(editor → owner), 삭제까지 모두 성공 확인했다. 검증용 임시 관리자는 삭제되어 운영 관리자 목록에 남아 있지 않다.
- 주의: 관리자 계정 관리 저장소는 활성화됐지만 사진/주보 실제 파일 업로드에는 별도 R2 `KCOC_MEDIA` 바인딩과 `KCOC_MEDIA_PUBLIC_URL` 설정이 추가로 필요하다.

### 2026-05-17 17:13 PDT

- Cloudflare R2를 활성화한 뒤 `kcoc-media` bucket을 생성하고 `media.kcocoh.org` custom domain을 연결했다.
- Pages 프로젝트 `kcocoh-site` production/preview에 R2 바인딩 `KCOC_MEDIA`와 환경변수 `KCOC_MEDIA_PUBLIC_URL=https://media.kcocoh.org`를 추가했다.
- 최종 배포 URL: `https://7bd9f173.kcocoh-site-2im.pages.dev`.
- 운영 검증: 초기 관리자 로그인 후 사진 PNG 업로드, 주보 PDF 업로드, 공개 API `/api/media/gallery`, `/api/bulletins` 반영, R2 공개 URL의 `image/png`/`application/pdf` 응답까지 확인했다.
- 검증용 임시 사진/주보 객체와 KV metadata는 삭제했고, 공개 API는 업로드 전 seed fallback 상태로 복구했다.

### 2026-05-17 17:21 PDT

- 기존 사이트 `https://www.mykoreanchurch.org/weekly_news/weekly`의 주보 페이지 1~18을 확인했고, PDF로 연결된 주보 60개를 추출했다.
- 관리자 API를 통해 2025-03-09부터 2026-05-17까지 주보 PDF 60개를 KCOC 운영 사이트에 업로드했다.
- 공개 API `/api/bulletins` 검증 결과 `fallback: false`, `items: 60`, 최신 `2026-05-17`, 가장 오래된 항목 `2025-03-09`로 확인했다.
- 대표 PDF URL 5개를 직접 열어 `200 application/pdf`와 `%PDF-` 서명을 확인했고, 브라우저에서 `https://kcocoh.org/#bulletins` 주보 목록 반영을 확인했다.

### 2026-05-17 17:29 PDT

- `https://www.mykoreanchurch.org/about/minister` 교역자 소개 페이지에서 교역자 사진 4장을 가져와 `site/v1/media/ministers/`에 최적화 JPG로 정리했다.
- 메인 사이트에 `#about` 교회소개 섹션과 `섬기는 사람들` 교역자 카드 4개(정지웅, 이성영, Simon Baik, Jed Yi)를 추가했다.
- 사진은 일관된 카드 비율, 배경 블러, 부드러운 명암 보정, 모바일 1열/태블릿 2열/데스크톱 4열 반응형 레이아웃으로 구성했다.
- KO/EN/ZH/ES 다국어 문자열과 상단 `교회소개` 내비게이션을 추가했다.
- `https://kcocoh.org/#about`에서 섹션/사진 URL이 정상 로드되는 것을 검증했고, 브라우저 시각 점검에서 큰 레이아웃 문제 없이 premium/clean으로 보이는 것을 확인했다.

### 2026-05-17 17:49 PDT

- 교회소개 섹션의 overline/kicker 문구가 KO/EN/ZH/ES 각 언어로 바뀌도록 보완하고, `assets/app.js?v=20260517-1748`로 cache busting을 적용했다.
- 주보 PDF iframe이 일부 브라우저에서 빈 화면/깨진 아이콘으로 보이는 문제를 수정했다: `/api/bulletins/view` same-origin PDF proxy와 로컬 PDF.js canvas preview(`assets/vendor/pdf.mjs`, `pdf.worker.mjs`)를 추가했다.
- CSP `frame-src/connect-src`에 `media.kcocoh.org`를 명시해 주보 파일 접근을 안전하게 허용했다.
- 운영 사이트 `https://kcocoh.org/#bulletins`에서 최신 주보가 canvas로 렌더링되는 것과 KO/EN/ZH/ES 교회소개 문구 전환을 브라우저로 확인했다.

### 2026-05-17 17:58 PDT

- 주보 다운로드 버튼이 PDF.js 미리보기 렌더링 후 사라질 수 있는 문제를 수정했다. PDF 다운로드는 `/api/bulletins/view?src=...&download=1` same-origin proxy를 사용하며 `Content-Disposition: attachment` 헤더로 내려받기 동작을 명시한다.
- 주보 미리보기 영역을 더 크게 조정하고, 오른쪽 주보 목록 카드는 프레임과 같은 높이로 맞췄다. 목록 항목은 더 작게 압축했고, 60개 주보는 목록 카드 내부에서 마우스 휠/트랙패드로 스크롤해 이전 주보를 볼 수 있다.
- `assets/app.js?v=20260517-2058`로 cache busting을 갱신했다.
- 운영 검증: `https://kcocoh.org/#bulletins`에서 PDF canvas 표시, `주보 다운로드` 링크 표시, 다운로드 응답 `200 application/pdf` 및 `Content-Disposition: attachment`를 확인했다.

### 2026-05-17 18:35 PDT

- 주보 PDF 미리보기를 두 페이지 동시 표시에서 한 페이지씩 크게 보는 방식으로 변경했다.
- 첫 페이지를 먼저 보여주고, 오른쪽 영역/`다음 페이지` 버튼을 누르면 2페이지로 전환되며 왼쪽 영역/`이전 페이지` 버튼으로 돌아오도록 했다.
- KO/EN/ZH/ES 안내 문구와 운영자 매뉴얼을 새 동작에 맞게 갱신했다.
- 로컬 검증: `bash scripts/sync-to-deploy.sh`, `bash scripts/validate.sh`, `node --check site/v1/assets/app.js` 통과.
- 운영 배포 완료: `https://f8ebc622.kcocoh-site-2im.pages.dev`가 production으로 배포되어 `https://kcocoh.org/#bulletins`에 반영됐다.
- 라이브 검증: custom domain의 `assets/app.js?v=20260517-2140` 반영, 새 `.bulletin-page-stage` CSS 반영, 기존 `.bulletin-spread` 제거, 주보 목록 60개 유지, 최신 주보 1페이지 canvas 1개 표시, `다음 페이지` 클릭 후 `페이지 2 / 2` 전환 확인.

### 2026-05-17 18:58 PDT

- 방문자 안내 섹션 제목을 `처음 방문하신 분도 주님의 사랑으로 환영합니다`에서 `주님은 오늘 당신에게 사랑한다고 말씀하십니다`로 변경했다.
- `assets/app.js?v=20260517-1858`로 cache busting을 갱신했다.
- 로컬 검증: `bash scripts/sync-to-deploy.sh`, `bash scripts/validate.sh`, `node --check site/v1/assets/app.js` 통과.

### 2026-05-17 19:22 PDT

- 다음세대/부서 카드에 주일학교, 중고등부, 청년부, 영어부, 한글교실, 성경공부와 교사반 내용을 더 구체적으로 반영했다.
- KO/EN/ZH/ES 다국어 문자열을 함께 갱신하고 `assets/app.js?v=20260517-1908`로 cache busting을 적용했다.
- 로컬 검증: `bash scripts/sync-to-deploy.sh`, `bash scripts/validate.sh`, `node --check site/v1/assets/app.js`, 로컬 브라우저 KO/EN/ZH/ES 언어 전환 확인 통과.
- 운영 배포 완료: 제공된 KCOC Cloudflare 계정 토큰으로 `kcocoh-deploy`에서 Pages Functions 포함 배포를 실행했고, 배포 URL은 `https://e45c3f11.kcocoh-site-2im.pages.dev`이다.
- 라이브 검증: `https://kcocoh.org/`, `https://www.kcocoh.org/`, Pages preview 모두 HTTP 200, `assets/app.js?v=20260517-1908` 반영, 다음세대 한국어 문구 반영, KO/EN/ZH/ES 브라우저 언어 전환 및 콘솔 오류 없음 확인.

### 2026-05-17 19:42 PDT

- 관리자 페이지 Hero 문구 저장 흐름에 OpenAI 자동 번역을 추가했다.
- 운영자가 한국어 제목/소개를 입력하고 저장하면 `OPENAI_API_KEY` secret을 사용해 영어, 중국어, 스페인어 번역을 생성해 함께 저장한다.
- 자동 번역 필드는 관리자 화면에서 읽기 전용으로 표시하고, 저장 응답으로 돌아온 번역 결과를 즉시 다시 채우도록 했다.
- 로컬 회귀 테스트를 위해 `node --test` 기반 테스트를 추가했고, `npm test`, `node --check`, `scripts/sync-to-deploy.sh`, `scripts/validate.sh`로 검증한다.
- 운영 배포와 실제 저장 검증은 Cloudflare Pages production secret `OPENAI_API_KEY` 설정이 필요하다.

### 2026-05-17 19:53 PDT

- Cloudflare Pages production secret `OPENAI_API_KEY`를 설정하고 자동 번역 코드가 포함된 Pages Functions를 운영 배포했다.
- 배포 URL은 `https://f349bd1e.kcocoh-site-2im.pages.dev`이다.
- 운영 로그인과 `/api/admin/content` 저장 경로 호출을 확인했다. 현재 제공된 OpenAI 키는 OpenAI 응답 기준 quota/billing 초과 상태라 실제 번역 저장은 `translation_failed`로 막힌다.
- OpenAI 계정 결제/크레딧 문제를 해결하거나 사용 가능한 API 키로 `OPENAI_API_KEY` secret을 교체하면 같은 코드로 자동 번역 저장이 동작한다.
- Cloudflare가 502 응답을 edge 오류 페이지로 바꾸지 않도록 번역 실패 응답을 JSON `424 translation_failed`로 조정했다.

### 2026-05-17 20:00 PDT

- OpenAI Platform 결제 반영 후 운영 관리자 저장 API를 다시 검증했다.
- `https://kcocoh.org/api/admin/content`에 기존 한국어 Hero 콘텐츠를 재저장했고, OpenAI 자동 번역이 정상 동작해 영어/중국어/스페인어 번역이 함께 저장됐다.
- 응답 확인: `put status 200`, `translation.provider=openai`, `source=ko`, `targets=en,zh,es`.
- 현재 KCOC 운영 사이트의 관리자 Hero 자동 번역 기능은 활성 상태이다.

### 2026-05-17 20:14 PDT

- 사용자가 제공한 기존 사이트 다음세대 공개 페이지 4개(주일학교, 중고등부, 청년부, 영어부)의 내용을 `#nextgen` 섹션에 상세 카드로 반영했다.
- 주일학교는 유치부/초등부 시간과 Gospel Light/복음 중심 성경공부 설명을 추가했고, 중고등부는 주일 10:30 예배와 금요일 7시 성경공부/소그룹 흐름을 반영했다.
- 청년부는 요한복음 4:23 기반의 “영과 진리” 예배 문구, 금요일 예배와 주일 기도회 시간을 반영했다.
- 영어부에는 KCCEM 설명과 영어권 스트리밍 `https://www.youtube.com/@kcc.english/streams`, EM 웹사이트 링크를 추가했다.
- 다음세대 카드 6개 모두 사진형 카드로 균형을 맞추고, KO/EN/ZH/ES 번역 키와 `assets/app.js?v=20260517-2004` 캐시 버전을 갱신했다.
- 로컬 동기화, `node --check site/v1/assets/app.js`, `bash scripts/validate.sh`, 브라우저 언어 전환/이미지/링크 확인을 완료했다.

### 2026-05-17 20:54 PDT

- `joe@kimscomputer.com`에 부여된 KCOC Cloudflare 운영 계정 권한이 기존 OAuth 토큰에 바로 보이지 않아 Wrangler OAuth를 재로그인했다.
- 재로그인 후 `wrangler whoami`가 `joe@solisenginc.com` / account `466715dac50b40c2422b3d35686a940c`를 표시했고, `scripts/cloudflare-profile.sh run kcoc -- wrangler pages project list`에서 `kcocoh-site` 접근을 확인했다.
- 다음세대 상세 카드 변경분을 다시 `kcocoh-deploy`로 동기화하고 `bash scripts/validate.sh`, `node --check site/v1/assets/app.js`를 통과한 뒤 운영 배포했다.
- 배포 URL은 `https://09f6600d.kcocoh-site-2im.pages.dev`이다.
- 라이브 검증: `https://kcocoh.org/`, `https://www.kcocoh.org/` HTTP 200, `assets/app.js?v=20260517-2004` 반영, `#nextgen`의 Sunday School/Youth/Young Adults/KCCEM 상세 문구와 영어 전환 표시, 브라우저 콘솔 오류 없음 확인.

### 2026-05-17 21:07 PDT

- 사용자 제보: 화면 폭이 줄어 `섬기는 사람들` 카드가 2열처럼 넓어질 때 교역자 사진이 카드 안에서 위/아래로 심하게 잘려 얼굴이 반만 보이는 문제가 있었다.
- 원인: 교역자 사진 영역이 폭 변화 대비 낮은 높이와 cover성 배경/이미지 처리에 취약해, 중간 폭 카드에서 인물 사진이 잘려 보일 수 있었다.
- 수정: `.staff-photo`를 flex 중앙 정렬과 `object-fit: contain` 중심으로 고정하고, 중간 폭 2열 구간에서는 사진 영역 높이를 `clamp(420px, 44vw, 560px)`로 키웠다. 실제 사진은 잘리지 않게 보여주고, 남는 좌우/상하 공간은 같은 이미지의 blur background로 자연스럽게 채우도록 했다.
- 운영 배포 URL은 `https://75120769.kcocoh-site-2im.pages.dev`이다.
- 검증: 로컬 `sync-to-deploy`, `validate.sh`, staff CSS marker 확인 통과. 라이브 `https://kcocoh.org/`에서 `max-width: min(100%, 520px)`, `object-fit: contain`, 2열 staff 높이 marker 반영과 브라우저 computed style/콘솔 오류 없음 확인.

### 2026-05-17 21:17 PDT

- 사용자 제보: 주보 섹션의 `교회에 문의하기` 버튼이 클릭해도 명확한 이동/링크 동작이 없는 것처럼 보였다.
- 수정: 해당 버튼을 `mailto:` 직접 실행에서 `#contact` 연락처 섹션 이동으로 변경해 모든 브라우저에서 확실히 동작하게 했다.
- 연락처 섹션에 별도 `전화하기`와 `이메일 보내기` 버튼을 추가했고, KO/EN/ZH/ES 번역 키를 추가했다.
- `assets/app.js?v=20260517-2117`로 cache busting을 갱신했다.
- 운영 배포 URL은 `https://5efe6e48.kcocoh-site-2im.pages.dev`이다.
- 라이브 검증: `교회에 문의하기` href `#contact`, `전화하기` href `tel:+16147261022`, `이메일 보내기` href `mailto:help@mykoreanchurch.org`, 새 app.js 버전 반영, 브라우저 콘솔 오류 없음 확인.

### 2026-05-18 YouTube 최신 영상 카드

- `#media` 섹션의 고정 수요예배 playlist iframe을 최신 YouTube 영상 카드로 바꿨다.
- 새 Pages Function `/api/youtube/latest`는 KCOC 공식 채널 `@KoreanChurchofColumbus`의 최신 영상을 가져온다. YouTube RSS를 먼저 시도하고, 실패하면 채널 `/videos` 페이지 파싱으로 fallback한다.
- 프론트엔드는 최신 영상 제목, 썸네일, 상대 시간, `최신 영상 보기`, `공식 채널` 링크를 표시한다. headless/일부 브라우저 검증에서 YouTube iframe이 검은 박스로 보일 수 있어 썸네일 우선 카드 패턴을 사용한다.
- `assets/app.js?v=20260518-youtube-thumb`로 cache busting을 갱신했다.
- 로컬/운영 검증: `node --check site/v1/assets/app.js`, `bash scripts/validate.sh`, 운영 `/api/youtube/latest` JSON 응답, custom domain의 새 HTML/JS marker, 390px 모바일 CDP viewport에서 `Sermons & Media`/사진 카드/최신 영상 카드 overflow 없음 확인.
- 운영 Pages Functions 포함 배포 URL은 `https://518582e0.kcocoh-site-2im.pages.dev`이다.

### 2026-05-18 04:24 PDT

- 사용자 모바일 캡처 기준으로 상단 메뉴가 일부만 보이고 뒤에 더 있는지 알 수 없는 문제를 확인했다.
- 모바일 내비게이션을 가로 스크롤/클리핑 방식에서 4열 × 2줄 그리드로 바꿔 8개 메뉴가 모두 한 화면에 보이도록 수정했다.
- `주님은 오늘 당신에게 사랑한다고 말씀하십니다` 제목이 `사/랑`처럼 음절 단위로 깨지지 않도록 모바일 제목/헤딩에 `word-break: keep-all`, `overflow-wrap: normal`, `text-wrap: balance`를 적용하고 섹션 제목 크기를 소폭 낮췄다.
- 모바일 앵커 이동 시 sticky header가 섹션 제목을 가리는 문제를 막기 위해 모바일 `scroll-margin-top`을 조정했다.
- 검증: `bash scripts/sync-to-deploy.sh`, `bash scripts/validate.sh`, 운영 `https://kcocoh.org/` HTML marker 확인, 390px CDP 모바일 viewport에서 메뉴 8개 전체 노출/가로 overflow 없음/방문 섹션 제목 2줄 렌더링을 확인했다.
- 운영 배포 URL은 `https://16897d72.kcocoh-site-2im.pages.dev`이다.
