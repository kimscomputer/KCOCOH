# KCOC 기존 사이트 보안 참고

`https://www.mykoreanchurch.org/` 공개 HTML 검토에서 모든 주요 페이지 하단에 숨겨진 스팸성 footer 링크가 삽입된 흔적이 있었다.

따라서 새 KCOC 사이트는 다음 원칙을 따른다.

- WordPress 테마/플러그인/원본 HTML을 그대로 이식하지 않는다.
- 공개-safe 콘텐츠만 추출해 새 문장과 새 HTML 구조로 재작성한다.
- 외부 링크는 검토 후 명시적으로 추가한다.
- 배포 전 `luxurywatches`, `replica watches`, `fake watches` 같은 오염 문자열이 없는지 검사한다.
