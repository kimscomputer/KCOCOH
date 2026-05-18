# KCOC 사용자/운영 매뉴얼

## 목적

이 문서는 KCOC 웹사이트 운영자가 사이트 구조, 배포, 검증 상태를 이해하기 위한 기본 매뉴얼이다.

## 현재 상태

- 작업 폴더: `/Users/soliscrew/Library/Mobile Documents/com~apple~CloudDocs/kcocoh`
- 정적 사이트 원본: `site/v1/`
- 배포 staging: `../kcocoh-deploy/`
- 작업 도메인: `kcocoh.org`

## 일반 작업 순서

1. `site/v1/`에서 콘텐츠/디자인 수정
2. `bash scripts/sync-to-deploy.sh` 실행
3. `bash scripts/validate.sh` 실행
4. Cloudflare Pages 배포
5. `https://kcocoh.org`에서 브라우저 검증
6. git commit/push

## Cloudflare 계정/토큰 관리

여러 Cloudflare 계정을 혼동하지 않도록 계정별 프로필을 사용한다. KCOC 운영 프로필 이름은 `kcoc`이다. 프로필에는 Account ID, Pages project, Zone 이름처럼 비밀이 아닌 값만 저장한다.

장기 대책은 Cloudflare 사용자 권한을 정리하는 것이다. Hermes/Wrangler가 로그인한 Cloudflare 사용자에게 KCOC, OWBCC 등 운영에 필요한 모든 Cloudflare 계정 권한을 부여하면, 작업할 때마다 새 토큰을 받을 필요가 없다. 계정별 API 토큰은 그 권한 정리가 안 된 계정에 한해서만 macOS Keychain에 한 번 저장하는 보조 수단으로 사용한다.

KCOC 프로필 상태 확인:

```bash
scripts/cloudflare-profile.sh show kcoc
```

OAuth 로그인 권한으로 실행 가능한지 확인:

```bash
scripts/cloudflare-profile.sh run kcoc -- wrangler whoami
```

OAuth 권한이 부족한 계정에 한해서만 Cloudflare 토큰을 Keychain에 저장:

```bash
scripts/cloudflare-profile.sh token kcoc
```

배포 또는 Cloudflare 명령 실행 시에는 `run kcoc --` 뒤에 실제 명령을 붙인다.

```bash
scripts/cloudflare-profile.sh run kcoc -- wrangler whoami
```

이 방식은 `/tmp/kcocoh_cf_token` 같은 임시 파일을 계속 만들지 않고, 계정별로 안전하게 분리해서 관리하기 위한 표준 방식이다.

## 콘텐츠 원칙

- 기존 WordPress의 공개 콘텐츠는 참고하되 그대로 복사하지 않는다.
- 교회 방문자가 바로 필요한 정보: 예배 시간, 위치, 새가족 안내, 다음세대/영어부/한글학교를 우선 배치한다.
- 한국어와 영어는 직역보다 같은 목적/정서를 자연스럽게 맞춘다.

## 디자인 운영 원칙

- 새 배너, 카드, 공지, CTA를 추가할 때 장식성 이모티콘으로 분위기를 만들지 않는다.
- 고급스럽고 신뢰감 있는 톤을 위해 큰 글자, 충분한 여백, 실제 사진, 절제된 색상, 짧고 명확한 문장을 우선한다.
- 행사 포스터나 긴 공지 이미지를 첫 화면에 그대로 나열하지 않는다. 방문자는 예배 시간, 위치, 새가족 안내, 온라인 예배를 먼저 찾는다.
- 사진은 가능하면 고해상도 원본을 사용하고, 첫 화면은 지나치게 어둡게 만들지 않는다. 사진 자체가 식별될 수 있도록 밝은 오버레이와 텍스트 영역을 분리한다.
- 섹션 제목과 Hero 제목은 모바일/데스크톱 모두에서 과도하게 크지 않도록 절제된 크기 범위를 유지한다.
- 다국어 문구는 한국어/영어/중국어/스페인어 모두 같은 목적을 전달하되, 최종 공개 전 교회 공식 표현으로 검수한다.

## 현재 홈페이지 구성

`site/v1/index.html`은 초기 랜딩 페이지로 구성되어 있다.
첫 화면은 밝은 크림 배경과 실제 예배당 사진을 분리해서 사용하며, 제목 크기는 방문자 가독성을 해치지 않도록 낮춘다.

섹션 순서:

1. Hero / 교회 정체성과 주요 CTA
2. 예배와 말씀
3. 처음 오신 분 안내
4. 다음세대와 교육
5. 공동체와 선교
6. 주보와 교회소식
7. 오시는 길 / 연락처

아직 확정이 필요한 정보:

- 주일 한글예배 시간
- English Ministry 예배 시간
- 수요예배/주중 모임 시간
- 온라인 예배 링크
- 실제 교회 사진/로고 원본

위 정보가 확정되면 `site/v1/index.html`에서 임시 문구를 실제 정보로 교체한 뒤 `scripts/sync-to-deploy.sh`와 `scripts/validate.sh`를 실행한다.


## 관리 페이지

- 관리 UI 원본: `site/v1/admin/index.html`, `site/v1/admin/admin.js`
- 관리 API 스캐폴드: `site/v1/functions/api/admin/content.js`
- 접속 경로: `/admin/`

현재 관리 페이지는 Hero 문구, 예배 시간, 주보/소식, 사진 업로드, 주보 업로드, 연락처를 입력하고 JSON으로 내보낼 수 있다. Hero 문구는 한국어 제목/소개를 기준으로 저장 시 OpenAI가 영어, 중국어, 스페인어를 자동 번역해 `hero.title.en/zh/es`, `hero.lead.en/zh/es`에 저장한다. 운영에서 이 기능을 사용하려면 Cloudflare Pages secret `OPENAI_API_KEY`가 설정되어 있어야 한다. 선택적으로 `OPENAI_TRANSLATION_MODEL`을 지정하지 않으면 기본 모델은 `gpt-4o-mini`이다. Cloudflare Pages Functions는 `/api/admin/content`, `/api/admin/users`, `/api/admin/media`, `/api/admin/bulletins`, `/api/media/gallery`, `/api/bulletins` 경로로 준비되어 있다.

관리자 계정 관리는 운영에서 활성화되어 있다. `/admin/` 로그인 후 `관리자 / Users` 탭에서 최고 관리자(owner)가 새 관리자 이메일 아이디를 등록하고, 권한을 `owner` 또는 `editor`로 지정하며, 비밀번호 변경, 활성/비활성, 삭제를 처리할 수 있다. 등록된 관리자는 로그인 화면의 `관리자 이메일 아이디`와 비밀번호로 접속한다. 기존 초기 관리자 비밀번호는 백업/초기 owner 로그인으로 유지한다.

사진/주보 업로드와 같은 파일 저장 기능은 운영에서 활성화되어 있다.

1. Cloudflare Access로 관리자 경로 보호
2. `ADMIN_ACCESS_ENFORCED=true` 설정
3. 허용 이메일 `ADMIN_ALLOWED_EMAILS` 설정
4. KV `KCOC_CONTENT` 바인딩 연결 — 완료, 관리자 계정 저장에 사용 중
5. 사진/주보 파일 저장용 R2 `KCOC_MEDIA` 바인딩 연결 — 완료, `kcoc-media` bucket 사용 중
6. 공개 파일 URL용 `KCOC_MEDIA_PUBLIC_URL` 설정 — 완료, `https://media.kcocoh.org`

저장소가 연결되기 전에는 원격 쓰기 요청이 안전하게 실패하도록 설계되어 있다. 현재 관리자 계정 저장소와 사진/주보 파일 저장소가 모두 연결되어 있다.

## 사진/주보 운영

- 사진은 관리자 페이지의 `사진 업로드` 탭에서 올린다. 제목과 설명을 입력하고 이미지 파일을 선택한 뒤 업로드하면 R2 `kcoc-media` bucket에 저장되고 공개 갤러리 목록에 반영된다.
- 주보는 관리자 페이지의 `주보 업로드` 탭에서 PDF 또는 이미지 파일로 올린다. 날짜와 제목을 입력한 뒤 업로드하면 공개 주보 목록과 다운로드 링크에 반영된다.
- PDF 주보는 공개 페이지에서 한 페이지씩 크게 보이는 미리보기로 렌더링된다. 오른쪽 영역 또는 `다음 페이지` 버튼을 누르면 2페이지로 넘어가고, 왼쪽 영역 또는 `이전 페이지` 버튼을 누르면 1페이지로 돌아온다. 다운로드 버튼은 항상 함께 제공된다.
- 공개 파일 URL은 `https://media.kcocoh.org/...` 형식이다.
- 사진 파일은 8MB 이하, 주보 파일은 12MB 이하로 유지한다.
- `/api/admin/media`와 `/api/admin/bulletins`의 GET 응답은 업로드 준비 상태를 JSON으로 보여준다. R2와 KV가 연결되어 있으면 실제 업로드가 가능하다.
