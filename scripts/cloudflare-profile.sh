#!/usr/bin/env bash
set -euo pipefail

SERVICE="hermes-cloudflare-api-token"
CONFIG_DIR="${HOME}/.hermes/cloudflare-profiles"

usage() {
  cat <<'EOF'
Cloudflare 계정/토큰 프로필 관리자

사용법:
  scripts/cloudflare-profile.sh init <profile> <account_id> <pages_project> [zone_name]
  scripts/cloudflare-profile.sh token <profile>
  scripts/cloudflare-profile.sh run <profile> -- <command> [args...]
  scripts/cloudflare-profile.sh list
  scripts/cloudflare-profile.sh show <profile>
  scripts/cloudflare-profile.sh delete-token <profile>

예:
  scripts/cloudflare-profile.sh init kcoc 466715dac50b40c2422b3d35686a940c kcocoh-site kcocoh.org
  scripts/cloudflare-profile.sh token kcoc
  scripts/cloudflare-profile.sh run kcoc -- wrangler pages deploy . --project-name=kcocoh-site --branch=main

토큰은 macOS Keychain에 저장되고, 파일/깃/문서에는 저장되지 않습니다.
EOF
}

profile_file() {
  local profile="$1"
  if [[ ! "$profile" =~ ^[A-Za-z0-9._-]+$ ]]; then
    echo "프로필 이름은 영문/숫자/점/밑줄/하이픈만 사용할 수 있습니다." >&2
    exit 2
  fi
  printf '%s/%s.env' "$CONFIG_DIR" "$profile"
}

require_profile() {
  local profile="$1"
  local file
  file="$(profile_file "$profile")"
  if [[ ! -f "$file" ]]; then
    echo "프로필이 없습니다: $profile" >&2
    echo "먼저 init을 실행하세요." >&2
    exit 2
  fi
  # shellcheck disable=SC1090
  source "$file"
  : "${CLOUDFLARE_ACCOUNT_ID:?profile missing CLOUDFLARE_ACCOUNT_ID}"
  : "${CLOUDFLARE_PAGES_PROJECT:?profile missing CLOUDFLARE_PAGES_PROJECT}"
}

get_token() {
  local profile="$1"
  security find-generic-password -s "$SERVICE" -a "$profile" -w 2>/dev/null || true
}

cmd="${1:-help}"
case "$cmd" in
  init)
    profile="${2:-}"
    account_id="${3:-}"
    project="${4:-}"
    zone="${5:-}"
    if [[ -z "$profile" || -z "$account_id" || -z "$project" ]]; then
      usage >&2
      exit 2
    fi
    mkdir -p "$CONFIG_DIR"
    chmod 700 "$CONFIG_DIR"
    file="$(profile_file "$profile")"
    umask 077
    cat > "$file" <<EOF
CLOUDFLARE_ACCOUNT_ID='$account_id'
CLOUDFLARE_PAGES_PROJECT='$project'
CLOUDFLARE_ZONE_NAME='$zone'
EOF
    echo "프로필 저장 완료: $profile"
    echo "설정 파일: $file"
    echo "다음 단계: scripts/cloudflare-profile.sh token $profile"
    ;;

  token)
    profile="${2:-}"
    if [[ -z "$profile" ]]; then usage >&2; exit 2; fi
    read -r -s -p "Cloudflare token for [$profile] 붙여넣고 Enter: " token
    echo
    if [[ -z "$token" ]]; then
      echo "토큰이 비어 있습니다. 저장하지 않았습니다." >&2
      exit 1
    fi
    security add-generic-password -U -s "$SERVICE" -a "$profile" -w "$token" >/dev/null
    unset token
    echo "Keychain 저장 완료: $profile"
    ;;

  run)
    profile="${2:-}"
    shift 2 || true
    if [[ "${1:-}" == "--" ]]; then shift; fi
    if [[ -z "$profile" || $# -eq 0 ]]; then usage >&2; exit 2; fi
    require_profile "$profile"
    token="$(get_token "$profile")"
    if [[ -z "$token" ]]; then
      echo "Keychain에 토큰이 없습니다: $profile" >&2
      echo "먼저 실행: scripts/cloudflare-profile.sh token $profile" >&2
      exit 1
    fi
    export CLOUDFLARE_ACCOUNT_ID
    export CLOUDFLARE_API_TOKEN="$token"
    unset token
    "$@"
    ;;

  list)
    mkdir -p "$CONFIG_DIR"
    found=0
    for file in "$CONFIG_DIR"/*.env; do
      [[ -e "$file" ]] || continue
      found=1
      profile="$(basename "$file" .env)"
      # shellcheck disable=SC1090
      source "$file"
      if [[ -n "$(get_token "$profile")" ]]; then token_status="token: yes"; else token_status="token: no"; fi
      printf '%s  account=%s  project=%s  zone=%s  %s\n' "$profile" "${CLOUDFLARE_ACCOUNT_ID:-}" "${CLOUDFLARE_PAGES_PROJECT:-}" "${CLOUDFLARE_ZONE_NAME:-}" "$token_status"
    done
    if [[ "$found" -eq 0 ]]; then echo "저장된 프로필이 없습니다."; fi
    ;;

  show)
    profile="${2:-}"
    if [[ -z "$profile" ]]; then usage >&2; exit 2; fi
    require_profile "$profile"
    if [[ -n "$(get_token "$profile")" ]]; then token_status="yes"; else token_status="no"; fi
    cat <<EOF
profile: $profile
account_id: $CLOUDFLARE_ACCOUNT_ID
pages_project: $CLOUDFLARE_PAGES_PROJECT
zone_name: ${CLOUDFLARE_ZONE_NAME:-}
token_saved_in_keychain: $token_status
EOF
    ;;

  delete-token)
    profile="${2:-}"
    if [[ -z "$profile" ]]; then usage >&2; exit 2; fi
    security delete-generic-password -s "$SERVICE" -a "$profile" >/dev/null 2>&1 || true
    echo "Keychain 토큰 삭제 완료: $profile"
    ;;

  help|-h|--help)
    usage
    ;;

  *)
    usage >&2
    exit 2
    ;;
esac
