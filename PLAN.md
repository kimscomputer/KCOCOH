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

## 다음 작업

1. 예배 시간/온라인 예배 링크 세부 정보 확인 후 홈페이지에 반영
2. 교회 사진/로고 등 사용 허가된 원본 자산 수집 및 최적화
3. Cloudflare Pages custom-domain 상태가 `active`로 바뀌는지 재확인
4. 필요 시 `www.kcocoh.org` → `kcocoh.org` canonical redirect 정책 추가
