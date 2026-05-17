# KCOC 배포 메모

## 로컬 검증

```bash
bash scripts/sync-to-deploy.sh
bash scripts/validate.sh
```

## Cloudflare Pages 배포 예정 명령

프로젝트 생성 후 프로젝트명은 `kcocoh-site`를 기본으로 사용한다.

```bash
cd "/Users/soliscrew/Library/Mobile Documents/com~apple~CloudDocs/kcocoh-deploy"
npx wrangler pages deploy . --project-name=kcocoh-site --commit-dirty=true --branch=main
```

## 도메인

- Canonical: `https://kcocoh.org`
- Alias: `https://www.kcocoh.org`

도메인 연결 후 `www`는 canonical로 리디렉트하거나 둘 다 동일 Pages 프로젝트에 연결한다.
