#!/bin/bash
# validate.sh — KCOC 배포 전 정적 사이트 검증
set +e
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT="$(dirname "$SCRIPT_DIR")"
DEPLOY="$(cd "$ROOT/.." && pwd)/kcocoh-deploy"
ERRORS=0
WARNINGS=0

check_file() {
  local path="$1"; local label="$2"
  if [ ! -f "$path" ]; then echo "  ❌ [치명] 없음: $label"; ERRORS=$((ERRORS+1)); else echo "  ✅ $label"; fi
}

check_contains() {
  local path="$1"; local needle="$2"; local label="$3"
  if grep -q "$needle" "$path" 2>/dev/null; then echo "  ✅ $label"; else echo "  ❌ [치명] 누락: $label"; ERRORS=$((ERRORS+1)); fi
}

echo "== KCOC 사이트 무결성 검증 =="
echo "  워크스페이스: $ROOT"
echo "  배포 staging: $DEPLOY"
echo

echo "1) 핵심 파일"
check_file "$DEPLOY/index.html" "index.html"
check_file "$DEPLOY/_headers" "_headers"
check_file "$DEPLOY/robots.txt" "robots.txt"
check_file "$DEPLOY/sitemap.xml" "sitemap.xml"
echo

echo "2) KCOC 기본 표기"
check_contains "$DEPLOY/index.html" "Korean Church of Columbus" "영문 교회명"
check_contains "$DEPLOY/index.html" "kcocoh.org" "작업 도메인 표기"
echo

echo "3) 보안 헤더"
check_contains "$DEPLOY/_headers" "Content-Security-Policy:" "CSP"
check_contains "$DEPLOY/_headers" "X-Content-Type-Options:" "nosniff"
echo

echo "4) 기존 사이트 스팸 오염 문자열 방지"
if grep -RiqE "luxurywatches|replica watches|fake watches" "$DEPLOY"; then
  echo "  ❌ [치명] 스팸/오염 문자열 발견"
  ERRORS=$((ERRORS+1))
else
  echo "  ✅ 알려진 스팸 문자열 없음"
fi
echo

echo "=========================="
if [ "$ERRORS" -gt 0 ]; then
  echo "❌ 검증 실패: 치명적 오류 ${ERRORS}개, 경고 ${WARNINGS}개"
  exit 1
elif [ "$WARNINGS" -gt 0 ]; then
  echo "⚠ 경고 ${WARNINGS}개. 배포 가능하지만 검토 권장."
  exit 2
else
  echo "✅ 모든 검증 통과"
  exit 0
fi
