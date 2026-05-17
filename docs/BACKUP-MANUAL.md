# KCOC 백업/복구 매뉴얼

## 백업 스크립트

```bash
bash scripts/backup-system.sh "작업 설명"
```

## 백업 위치

- 로컬 스냅샷: `../KCOC WEB BACKUPS/`
- GitHub용 manifest: `backups/github/`

## 복구 기본 절차

1. `../KCOC WEB BACKUPS/`에서 원하는 시점의 스냅샷 확인
2. 필요한 파일만 현재 작업 폴더로 복사
3. `bash scripts/sync-to-deploy.sh && bash scripts/validate.sh`로 검증
4. 문제 없으면 commit/push
