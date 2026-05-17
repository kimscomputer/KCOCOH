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

현재 관리 페이지는 Hero 문구, 예배 시간, 주보/소식, 연락처를 입력하고 JSON으로 내보낼 수 있다. Cloudflare Pages Functions는 `/api/admin/content` 경로로 준비되어 있으며, 실제 원격 저장은 다음 조건이 충족되면 활성화한다.

1. Cloudflare Access로 관리자 경로 보호
2. `ADMIN_ACCESS_ENFORCED=true` 설정
3. 허용 이메일 `ADMIN_ALLOWED_EMAILS` 설정
4. D1 `DB` 또는 KV `KCOC_CONTENT` 바인딩 연결

Access와 저장소가 연결되기 전에는 원격 쓰기 요청이 안전하게 실패하도록 설계되어 있다.
