# KCOC Admin Quick Guide / 관리자 퀵 가이드

- Version / 버전: 2026-05-22
- Admin URL / 관리자 주소: https://kcocoh.org/admin/
- Public site / 공개 사이트: https://kcocoh.org/
- Purpose / 목적: This one-page guide helps church staff make common website updates quickly. / 이 문서는 교회 운영자가 자주 하는 웹사이트 수정 작업을 빠르게 처리하도록 돕는 요약 가이드입니다.

---

## 1. Sign in / 로그인

**English**
1. Open https://kcocoh.org/admin/.
2. Enter your admin email ID and password.
3. If Cloudflare Access appears first, complete the email verification, then continue to the KCOC admin login.
4. After login, confirm the status box says the backend is connected or ready.

**한국어**
1. https://kcocoh.org/admin/ 으로 접속합니다.
2. 관리자 이메일 아이디와 비밀번호를 입력합니다.
3. 먼저 Cloudflare Access 인증 화면이 나오면 이메일 인증을 완료한 뒤 KCOC 관리자 로그인으로 진행합니다.
4. 로그인 후 상단 상태 박스가 “관리 백엔드 연결됨” 또는 준비 상태로 표시되는지 확인합니다.

---

## 2. Main rule before saving / 저장 전 기본 원칙

**English**
- Edit one section at a time.
- Review the preview/operation memo at the bottom.
- Click **변경 저장 / Save Changes** after editing text-based sections.
- For uploads, use the upload button inside the Photos or Bulletins tab.
- Open the public homepage after saving to confirm the change.

**한국어**
- 한 번에 한 섹션씩 수정합니다.
- 하단의 “미리보기 / 운영 메모”를 확인합니다.
- 문구/시간/연락처 수정 후에는 상단 **변경 저장** 버튼을 누릅니다.
- 사진과 주보는 각 탭 안의 업로드 버튼을 사용합니다.
- 저장 후 공개 홈페이지에서 실제 반영 여부를 확인합니다.

---

## 3. Menu cheat sheet / 메뉴 요약

### 첫 화면 / Hero
**English:** Update the Korean homepage title and introduction. English, Chinese, and Spanish can be auto-translated when the translation secret is configured.  
**한국어:** 홈페이지 첫 화면의 한국어 제목과 소개 문구를 수정합니다. 번역 설정이 연결되어 있으면 영어/중국어/스페인어가 자동 생성됩니다.

### 예배 시간 / Worship Times
**English:** Update Sunday worship, English worship, children’s ministry, midweek worship, dawn prayer, youth/young adult times.  
**한국어:** 주일예배, 영어예배, 교회학교, 수요예배, 새벽기도, 중고등부/청년부 시간을 수정합니다.

### 주보/소식 / News
**English:** Update short weekly bulletin/news headlines shown on the site.  
**한국어:** 홈페이지에 표시되는 짧은 주간 안내와 소식 제목을 수정합니다.

### 사진 업로드 / Photos
**English:** Select an image, enter Korean/English title and caption, then click **사진 업로드**. Recommended size: under 8MB.  
**한국어:** 이미지 파일을 선택하고 한국어/영문 제목과 설명을 입력한 뒤 **사진 업로드**를 누릅니다. 권장 용량은 8MB 이하입니다.

### 주보 업로드 / Bulletins
**English:** Select a PDF or image bulletin, set the date/title, then click **주보 업로드**. Recommended size: under 12MB.  
**한국어:** PDF 또는 이미지 주보를 선택하고 날짜/제목을 입력한 뒤 **주보 업로드**를 누릅니다. 권장 용량은 12MB 이하입니다.

### 연락처 / Contact
**English:** Update address, phone, and email. Save after editing.  
**한국어:** 주소, 전화번호, 이메일을 수정합니다. 수정 후 저장합니다.

### 관리자 / Users
**English:** Owners can add admins, set owner/editor role, reset passwords, deactivate/reactivate, or delete users.  
**한국어:** 최고 관리자는 새 관리자를 추가하고, owner/editor 권한 지정, 비밀번호 변경, 비활성/활성, 삭제를 할 수 있습니다.

### 게시 상태 / Publish
**English:** Check API/backend, storage, Access protection, and public reflection status.  
**한국어:** API/백엔드, 저장소, Access 보호, 공개 반영 상태를 확인합니다.

---

## 4. After updating / 수정 후 확인

**English**
1. Click **홈페이지 보기 / View Homepage**.
2. Confirm the edited text, photo, bulletin, or contact information is visible.
3. If the old content still appears, refresh the browser or wait briefly for cache to clear.
4. If saving/upload fails, copy the exact error message and contact the site administrator.

**한국어**
1. **홈페이지 보기**를 누릅니다.
2. 수정한 문구, 사진, 주보, 연락처가 보이는지 확인합니다.
3. 이전 내용이 보이면 브라우저 새로고침을 하거나 캐시 반영을 잠시 기다립니다.
4. 저장/업로드가 실패하면 오류 문구를 그대로 복사해 사이트 관리자에게 전달합니다.

---

## 5. Emergency checklist / 문제 발생 시 체크리스트

**English**
- Cannot log in: check email ID/password, then Cloudflare Access email verification.
- Save failed: check whether admin session expired; log out and sign in again.
- Photo failed: confirm file type is JPG, PNG, WebP, or GIF and under 8MB.
- Bulletin failed: confirm file type is PDF/JPG/PNG/WebP and under 12MB.
- User management blocked: only an owner should perform admin account changes.

**한국어**
- 로그인이 안 됨: 이메일 아이디/비밀번호와 Cloudflare Access 이메일 인증을 확인합니다.
- 저장 실패: 관리자 세션 만료 가능성이 있으니 로그아웃 후 다시 로그인합니다.
- 사진 업로드 실패: JPG, PNG, WebP, GIF 형식과 8MB 이하 용량을 확인합니다.
- 주보 업로드 실패: PDF/JPG/PNG/WebP 형식과 12MB 이하 용량을 확인합니다.
- 관리자 계정 수정 불가: 관리자 계정 변경은 최고 관리자(owner)가 진행해야 합니다.
