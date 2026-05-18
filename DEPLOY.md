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

### Cloudflare 계정 프로필 관리

운영 배포는 `kcocoh.org` Zone이 있는 `Joe@solisenginc.com's Account` 기준으로 진행한다. 여러 Cloudflare 계정을 섞어 쓰지 않도록 계정별 프로필을 사용한다.

장기 운영 원칙은 다음 중 하나다.

1. 권장: Hermes/Wrangler가 로그인한 Cloudflare 사용자에게 모든 운영 계정 권한을 부여한다. 그러면 계정별 API 토큰을 매번 받을 필요 없이 OAuth 로그인으로 실행한다.
2. 보조: 특정 계정이 OAuth 사용자에게 열려 있지 않을 때만 계정별 API 토큰을 macOS Keychain에 한 번 저장한다.

KCOC 프로필은 다음 값으로 초기화되어 있다.

```bash
scripts/cloudflare-profile.sh show kcoc
```

OAuth 권한이 있는지 확인:

```bash
scripts/cloudflare-profile.sh run kcoc -- wrangler whoami
```

OAuth 권한이 부족한 계정에 한해서만, 처음 한 번 토큰을 Keychain에 저장한다. 토큰은 채팅/문서/깃에 남기지 않는다.

```bash
scripts/cloudflare-profile.sh token kcoc
```

저장된 프로필 목록 확인:

```bash
scripts/cloudflare-profile.sh list
```

### 배포 명령

```bash
bash scripts/sync-to-deploy.sh
cd "/Users/soliscrew/Library/Mobile Documents/com~apple~CloudDocs/kcocoh-deploy"
"/Users/soliscrew/Library/Mobile Documents/com~apple~CloudDocs/kcocoh/scripts/cloudflare-profile.sh" run kcoc -- wrangler pages deploy . --project-name=kcocoh-site --commit-dirty=true --branch=main
```

### 도메인

- Canonical: `https://kcocoh.org`
- Alias: `https://www.kcocoh.org`
- DNS records are proxied CNAMEs pointing to `kcocoh-site-2im.pages.dev`.

2026-05-17 11:57 PDT 검증 기준으로 두 도메인 모두 HTTP 200이며 KCOC 홈페이지 콘텐츠가 정상 렌더링된다. Cloudflare Pages custom-domain API 상태는 연결 직후 `pending`일 수 있으나, 실제 HTTPS 응답은 정상이다.
