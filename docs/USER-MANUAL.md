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
