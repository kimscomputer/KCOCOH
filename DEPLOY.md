# KCOC 배포 메모

## 로컬 검증

```bash
bash scripts/sync-to-deploy.sh
bash scripts/validate.sh
```

## Cloudflare Pages 배포

### 현재 운영 배포

- Cloudflare Account: `Joe@solisenginc.com's Account`
- Account ID: `466715dac50b40c2422b3d35686a940c`
- Zone: `kcocoh.org`
- Zone ID: `0815ce475c65b46b3dc0ec76b7033d14`
- Pages project: `kcocoh-site`
- Pages subdomain: `https://kcocoh-site-2im.pages.dev`
- KV binding: `KCOC_CONTENT` — 관리자 계정 관리 저장소
- R2 bucket/binding: `kcoc-media` / `KCOC_MEDIA` — 사진·주보 파일 저장소
- R2 public media domain: `https://media.kcocoh.org`
- Production domains:
  - `https://kcocoh.org`
  - `https://www.kcocoh.org`

### 배포 명령

운영 배포는 `kcocoh.org` Zone이 있는 `Joe@solisenginc.com's Account` 기준으로 진행한다. 임시 API 토큰을 사용할 때는 토큰을 채팅/문서에 남기지 말고 파일 또는 환경변수로만 전달한 뒤 작업 후 폐기한다.

```bash
bash scripts/sync-to-deploy.sh
cd "/Users/soliscrew/Library/Mobile Documents/com~apple~CloudDocs/kcocoh-deploy"
CLOUDFLARE_API_TOKEN="$(cat /tmp/kcocoh_cf_token)" wrangler pages deploy . --project-name=kcocoh-site --commit-dirty=true --branch=main
```

### 도메인

- Canonical: `https://kcocoh.org`
- Alias: `https://www.kcocoh.org`
- DNS records are proxied CNAMEs pointing to `kcocoh-site-2im.pages.dev`.

2026-05-17 11:57 PDT 검증 기준으로 두 도메인 모두 HTTP 200이며 KCOC 홈페이지 콘텐츠가 정상 렌더링된다. Cloudflare Pages custom-domain API 상태는 연결 직후 `pending`일 수 있으나, 실제 HTTPS 응답은 정상이다.
