# KCOC Admin Full Manual / 관리자 풀 매뉴얼

- Version / 버전: 2026-05-22
- Admin URL / 관리자 주소: https://kcocoh.org/admin/
- Public site / 공개 사이트: https://kcocoh.org/
- Media domain / 공개 파일 도메인: https://media.kcocoh.org/
- Audience / 대상: KCOC website owners, editors, and ministry staff / KCOC 웹사이트 최고 관리자, 편집 관리자, 사역 담당자

---

## 1. Overview / 개요

**English**  
The KCOC admin page is the control center for routine website operations. It is used to update homepage text, worship times, news, photos, bulletins, contact information, and admin users. The admin page is protected by Cloudflare Access and the KCOC admin login. Uploaded files are stored in Cloudflare R2, and content/admin records are stored through the site backend.

**한국어**  
KCOC 관리자 페이지는 일상적인 웹사이트 운영을 위한 관리 화면입니다. 홈페이지 문구, 예배 시간, 소식, 사진, 주보, 연락처, 관리자 계정을 수정할 수 있습니다. 관리자 페이지는 Cloudflare Access와 KCOC 관리자 로그인으로 보호됩니다. 업로드한 파일은 Cloudflare R2에 저장되고, 콘텐츠/관리자 정보는 사이트 백엔드를 통해 저장됩니다.

---

## 2. Roles and permissions / 권한 구분

### Owner / 최고 관리자
**English**
- Can manage website content.
- Can upload photos and bulletins.
- Can add, deactivate, reactivate, delete, and reset admin users.
- Should be limited to trusted church leadership or designated site administrators.

**한국어**
- 웹사이트 콘텐츠를 수정할 수 있습니다.
- 사진과 주보를 업로드할 수 있습니다.
- 관리자 추가, 비활성/활성, 삭제, 비밀번호 변경을 할 수 있습니다.
- 신뢰할 수 있는 교회 리더십 또는 지정된 웹사이트 관리자에게만 부여하는 권한입니다.

### Editor / 편집 관리자
**English**
- Can update routine content such as text, worship times, news, photos, and bulletins.
- Should not manage sensitive admin account changes unless promoted to owner.

**한국어**
- 문구, 예배 시간, 소식, 사진, 주보 등 일반 콘텐츠를 수정할 수 있습니다.
- 관리자 계정과 관련된 민감한 변경은 owner 권한이 있을 때만 진행하는 것이 원칙입니다.

### Bootstrap admin / 초기 관리자
**English**
- A backup login based on the server environment password.
- Kept for emergency/initial owner access.
- Do not share it casually.

**한국어**
- 서버 환경변수 비밀번호를 기반으로 한 백업 로그인입니다.
- 초기 owner 접속 또는 비상 상황을 위해 유지합니다.
- 일반적으로 공유하지 않습니다.

---

## 3. Login and session flow / 로그인과 세션 흐름

**English**
1. Go to https://kcocoh.org/admin/.
2. Complete Cloudflare Access email verification if prompted.
3. Enter the KCOC admin email ID and password.
4. After login, confirm the admin dashboard loads.
5. Use **로그아웃 / Log out** when finished, especially on shared computers.

**한국어**
1. https://kcocoh.org/admin/ 으로 접속합니다.
2. Cloudflare Access 이메일 인증 화면이 나오면 인증을 완료합니다.
3. KCOC 관리자 이메일 아이디와 비밀번호를 입력합니다.
4. 로그인 후 관리자 대시보드가 열리는지 확인합니다.
5. 공용 컴퓨터에서는 작업 후 반드시 **로그아웃**합니다.

**Session notes / 세션 참고**
- If the session expires, saving or uploading may fail or redirect to the login page. / 세션이 만료되면 저장 또는 업로드가 실패하거나 로그인 화면으로 이동할 수 있습니다.
- If this happens, sign in again and retry the action. / 이 경우 다시 로그인한 뒤 작업을 다시 시도합니다.

---

## 4. Admin screen layout / 관리자 화면 구성

**English**
- Top buttons: View Homepage, Log out, Save Changes.
- Left menu: Hero, Worship Times, News, Photos, Bulletins, Contact, Users, Publish Status.
- Main panel: The form for the selected menu.
- Bottom preview: A summary of the current text fields and a JSON export option.
- Status box: Shows success, warning, or error messages.

**한국어**
- 상단 버튼: 홈페이지 보기, 로그아웃, 변경 저장.
- 왼쪽 메뉴: 첫 화면, 예배 시간, 주보/소식, 사진 업로드, 주보 업로드, 연락처, 관리자, 게시 상태.
- 본문 영역: 선택한 메뉴의 입력 양식.
- 하단 미리보기: 현재 입력값 요약과 JSON 내보내기 기능.
- 상태 박스: 성공, 경고, 오류 메시지를 표시합니다.

---

## 5. First screen / Hero management / 첫 화면 관리

**English**
Use this tab to update the public homepage hero title and introduction. The Korean fields are the primary source. When the translation setting is configured, English, Chinese, and Spanish fields can be generated automatically from Korean.

Steps:
1. Open **첫 화면 / Hero**.
2. Edit **한국어 제목**.
3. Edit **한국어 소개**.
4. Review the auto-translated fields if available.
5. Click **변경 저장**.
6. Open the public homepage and confirm the hero text.

Writing guidance:
- Keep the title short and welcoming.
- Avoid internal jargon.
- The introduction should explain who KCOC is, what the church values, and whom it serves.

**한국어**
이 탭은 홈페이지 첫 화면 제목과 소개 문구를 수정하는 곳입니다. 한국어 입력값이 기준이 됩니다. 번역 설정이 연결되어 있으면 한국어를 기준으로 영어, 중국어, 스페인어가 자동 생성될 수 있습니다.

작업 순서:
1. **첫 화면 / Hero** 탭을 엽니다.
2. **한국어 제목**을 수정합니다.
3. **한국어 소개**를 수정합니다.
4. 자동 번역 필드가 표시되면 내용을 확인합니다.
5. **변경 저장**을 누릅니다.
6. 공개 홈페이지를 열어 첫 화면 문구가 반영되었는지 확인합니다.

작성 원칙:
- 제목은 짧고 환영하는 느낌으로 작성합니다.
- 교회 내부 용어만 사용하는 표현은 피합니다.
- 소개 문구에는 KCOC가 어떤 교회인지, 무엇을 소중히 여기는지, 누구를 섬기는지가 자연스럽게 드러나야 합니다.

---

## 6. Worship times / 예배 시간 관리

**English**
This tab controls worship schedule values used on the site.

Fields:
- Korean Sunday worship / 주일 장년예배
- English Sunday worship / 주일 영어예배
- Children’s ministry / 교회학교
- Wednesday or midweek worship / 수요예배
- Dawn prayer / 새벽기도
- Youth and young adult ministry / 중고등부/청년부

Steps:
1. Open **예배 시간 / Times**.
2. Enter times in a visitor-friendly format, such as `9:00 / 11:00 AM` or `Friday 7:00 PM`.
3. Click **변경 저장**.
4. Verify on the public homepage.

**한국어**
이 탭은 홈페이지에 표시되는 예배 시간 정보를 관리합니다.

입력 항목:
- 주일 장년예배
- 주일 영어예배
- 교회학교
- 수요예배
- 새벽기도
- 중고등부/청년부

작업 순서:
1. **예배 시간 / Times** 탭을 엽니다.
2. 방문자가 이해하기 쉬운 형식으로 시간을 입력합니다. 예: `9:00 / 11:00 AM`, `Friday 7:00 PM`.
3. **변경 저장**을 누릅니다.
4. 공개 홈페이지에서 확인합니다.

---

## 7. Bulletin and news text / 주보/소식 문구 관리

**English**
This tab is for short recurring weekly news items. It is not the same as uploading a bulletin PDF. Use it for small headlines, sermon titles, scripture references, or brief weekly notices.

Steps:
1. Open **주보/소식 / News**.
2. Edit each label and title.
3. Keep titles short enough to fit in cards.
4. Click **변경 저장**.
5. Confirm on the public site.

**한국어**
이 탭은 반복되는 주간 소식 문구를 간단히 수정하는 곳입니다. PDF 주보 업로드와는 별도입니다. 짧은 공지 제목, 설교 제목, 성경 본문, 주간 안내 등에 사용합니다.

작업 순서:
1. **주보/소식 / News** 탭을 엽니다.
2. 각 분류와 제목을 수정합니다.
3. 카드 안에 잘 들어가도록 제목은 짧게 유지합니다.
4. **변경 저장**을 누릅니다.
5. 공개 사이트에서 확인합니다.

---

## 8. Photo upload / 사진 업로드

**English**
Use this tab to upload church photos for the public gallery/media area.

Accepted file types:
- JPG/JPEG
- PNG
- WebP
- GIF

Recommended limit:
- Keep each photo under 8MB.

Steps:
1. Open **사진 업로드 / Photos**.
2. Click file selection and choose the image.
3. Enter Korean title.
4. Enter English title.
5. Enter caption/description.
6. Click **사진 업로드**.
7. Wait for the success message.
8. Click **사진 목록 새로고침** if needed.
9. Open the public homepage/gallery area and confirm the photo appears.

Best practices:
- Use clear photos where faces are not awkwardly cropped.
- Avoid posting private or sensitive photos without permission.
- Use descriptive titles such as “Sunday Worship Fellowship” rather than file names.

**한국어**
이 탭은 공개 갤러리/미디어 영역에 표시할 교회 사진을 업로드하는 곳입니다.

허용 파일 형식:
- JPG/JPEG
- PNG
- WebP
- GIF

권장 용량:
- 사진 한 장은 8MB 이하로 유지합니다.

작업 순서:
1. **사진 업로드 / Photos** 탭을 엽니다.
2. 파일 선택을 눌러 이미지를 고릅니다.
3. 한국어 제목을 입력합니다.
4. 영문 제목을 입력합니다.
5. 설명을 입력합니다.
6. **사진 업로드**를 누릅니다.
7. 성공 메시지가 나올 때까지 기다립니다.
8. 필요하면 **사진 목록 새로고침**을 누릅니다.
9. 공개 홈페이지/갤러리 영역에서 사진이 보이는지 확인합니다.

운영 원칙:
- 얼굴이 어색하게 잘리지 않는 선명한 사진을 사용합니다.
- 허락받지 않은 개인적/민감한 사진은 올리지 않습니다.
- 파일명 대신 “주일예배 교제”처럼 설명적인 제목을 사용합니다.

---

## 9. Bulletin upload / 주보 업로드

**English**
Use this tab to upload weekly bulletins. Uploaded PDF bulletins are shown in the website viewer and also provided as downloads.

Accepted file types:
- PDF
- JPG/JPEG
- PNG
- WebP

Recommended limit:
- Keep each bulletin file under 12MB.

Steps:
1. Open **주보 업로드 / PDF**.
2. Select the bulletin file.
3. Choose the bulletin date.
4. Enter Korean title.
5. Enter English title.
6. Click **주보 업로드**.
7. Wait for the success message.
8. Click **주보 목록 새로고침** if needed.
9. Open the public bulletin section.
10. For PDF bulletins, confirm page 1 appears first; use the right side or Next button to move to page 2.
11. Confirm the download button works.

**한국어**
이 탭은 주간 주보를 업로드하는 곳입니다. 업로드한 PDF 주보는 웹사이트 뷰어에서 표시되고 다운로드 링크도 함께 제공됩니다.

허용 파일 형식:
- PDF
- JPG/JPEG
- PNG
- WebP

권장 용량:
- 주보 파일은 12MB 이하로 유지합니다.

작업 순서:
1. **주보 업로드 / PDF** 탭을 엽니다.
2. 주보 파일을 선택합니다.
3. 주보 날짜를 지정합니다.
4. 한국어 제목을 입력합니다.
5. 영문 제목을 입력합니다.
6. **주보 업로드**를 누릅니다.
7. 성공 메시지가 나올 때까지 기다립니다.
8. 필요하면 **주보 목록 새로고침**을 누릅니다.
9. 공개 주보 섹션을 엽니다.
10. PDF 주보는 1페이지가 먼저 보이는지 확인하고, 오른쪽 영역 또는 다음 버튼으로 2페이지 이동을 확인합니다.
11. 다운로드 버튼이 작동하는지 확인합니다.

---

## 10. Contact information / 연락처 관리

**English**
Use this tab to update the church address, phone number, and email address. This information appears in public contact areas and may be used by visitor action buttons.

Steps:
1. Open **연락처 / Contact**.
2. Edit address, phone, and email.
3. Click **변경 저장**.
4. Open the public contact section and confirm all values.
5. Test phone/email-related visitor actions when possible.

**한국어**
이 탭은 교회 주소, 전화번호, 이메일을 수정하는 곳입니다. 이 정보는 공개 연락처 영역과 방문자용 연락 버튼에 사용될 수 있습니다.

작업 순서:
1. **연락처 / Contact** 탭을 엽니다.
2. 주소, 전화번호, 이메일을 수정합니다.
3. **변경 저장**을 누릅니다.
4. 공개 연락처 섹션에서 값이 맞는지 확인합니다.
5. 가능하면 전화/이메일 관련 버튼도 테스트합니다.

---

## 11. Admin users / 관리자 계정 관리

**English**
This tab manages who can sign in to the admin page. Use it carefully.

Add a new admin:
1. Open **관리자 / Users**.
2. Enter admin name.
3. Enter admin email ID.
4. Choose role: Owner or Editor.
5. Enter a temporary password of at least 10 characters.
6. Click **관리자 추가**.
7. Ask the new admin to sign in and change/store the password securely.

Deactivate/reactivate:
1. Click **비활성화** to block an admin without deleting the record.
2. Click **활성화** to restore access.

Reset password:
1. Click **비밀번호 변경**.
2. Enter a new password of at least 10 characters.
3. Share the new password through a secure channel only.

Delete:
1. Click **삭제** only when the account is no longer needed.
2. Confirm the browser prompt.
3. Prefer deactivation first if you are unsure.

**한국어**
이 탭은 관리자 페이지에 로그인할 수 있는 사용자를 관리하는 곳입니다. 신중하게 사용해야 합니다.

새 관리자 추가:
1. **관리자 / Users** 탭을 엽니다.
2. 관리자 이름을 입력합니다.
3. 관리자 이메일 아이디를 입력합니다.
4. 권한을 선택합니다: 최고 관리자 또는 편집 관리자.
5. 최소 10자 이상의 임시 비밀번호를 입력합니다.
6. **관리자 추가**를 누릅니다.
7. 새 관리자에게 로그인 후 비밀번호를 안전하게 보관하도록 안내합니다.

비활성/활성:
1. **비활성화**를 누르면 계정 기록은 남기고 로그인을 막을 수 있습니다.
2. **활성화**를 누르면 다시 접속할 수 있습니다.

비밀번호 변경:
1. **비밀번호 변경**을 누릅니다.
2. 최소 10자 이상의 새 비밀번호를 입력합니다.
3. 새 비밀번호는 안전한 방법으로만 전달합니다.

삭제:
1. 계정이 더 이상 필요 없을 때만 **삭제**를 누릅니다.
2. 브라우저 확인창에서 확인합니다.
3. 확실하지 않으면 삭제보다 비활성화를 먼저 사용합니다.

---

## 12. Publish status / 게시 상태 확인

**English**
This tab summarizes backend readiness. It can show:
- API status
- Storage connection
- Cloudflare Access protection
- Public reflection/readiness

Use this tab when saving or uploading fails. If the backend is not connected, contact the technical administrator before making repeated attempts.

**한국어**
이 탭은 백엔드 준비 상태를 요약해서 보여줍니다. 표시 항목은 다음과 같습니다.
- API 상태
- 저장소 연결 상태
- Cloudflare Access 보호 상태
- 공개 반영/준비 상태

저장이나 업로드가 실패할 때 이 탭을 확인합니다. 백엔드가 연결되어 있지 않다면 같은 작업을 반복하기보다 기술 관리자에게 문의합니다.

---

## 13. JSON export / JSON 내보내기

**English**
The bottom preview area includes **JSON 내보내기**. This copies or downloads the current form data as JSON. It is a backup/troubleshooting tool, not the normal publishing method.

Use it when:
- A technical administrator asks for the current input data.
- You want to preserve a draft before changing many fields.
- Saving fails and you need to send the attempted content for support.

**한국어**
하단 미리보기 영역에는 **JSON 내보내기** 버튼이 있습니다. 현재 입력값을 JSON으로 복사하거나 다운로드합니다. 일반 게시 방법이 아니라 백업/문제 해결용 기능입니다.

사용하는 경우:
- 기술 관리자가 현재 입력값을 요청한 경우
- 여러 항목을 크게 수정하기 전에 임시 보관하고 싶은 경우
- 저장 실패 후 입력했던 내용을 지원 담당자에게 전달해야 하는 경우

---

## 14. Public verification checklist / 공개 사이트 확인 체크리스트

**English**
After every update, verify the public page:
- Hero text reads correctly.
- Worship times are accurate.
- News items are current.
- New photo appears and looks properly cropped.
- Bulletin opens in the viewer and downloads correctly.
- Address, phone, and email are correct.
- Mobile view is readable if the change affects public content.

**한국어**
모든 수정 후 공개 페이지를 확인합니다.
- 첫 화면 문구가 자연스럽게 보이는지
- 예배 시간이 정확한지
- 소식이 최신인지
- 새 사진이 보이고 잘리지 않는지
- 주보가 뷰어에서 열리고 다운로드되는지
- 주소, 전화번호, 이메일이 정확한지
- 공개 콘텐츠 변경의 경우 모바일에서도 읽기 쉬운지

---

## 15. Troubleshooting / 문제 해결

### Cannot access admin page / 관리자 페이지 접속 불가
**English:** Check the URL, Cloudflare Access email verification, and whether your email is allowed.  
**한국어:** 주소, Cloudflare Access 이메일 인증, 허용된 이메일 여부를 확인합니다.

### Login fails / 로그인 실패
**English:** Confirm the email ID and password. Ask an owner to reset the password if needed.  
**한국어:** 이메일 아이디와 비밀번호를 확인합니다. 필요하면 owner에게 비밀번호 변경을 요청합니다.

### Save fails / 저장 실패
**English:** The session may have expired, or backend storage may be unavailable. Log in again and retry once. If it fails again, send the error message to the technical administrator.  
**한국어:** 세션 만료 또는 백엔드 저장소 문제일 수 있습니다. 다시 로그인 후 한 번 더 시도합니다. 계속 실패하면 오류 메시지를 기술 관리자에게 전달합니다.

### Upload fails / 업로드 실패
**English:** Check file type and size first. Photos should be under 8MB; bulletins should be under 12MB. If file size/type is correct, storage or Access settings may need technical review.  
**한국어:** 먼저 파일 형식과 용량을 확인합니다. 사진은 8MB 이하, 주보는 12MB 이하가 권장됩니다. 형식과 용량이 맞는데도 실패하면 저장소 또는 Access 설정 점검이 필요합니다.

### Old content still appears / 이전 내용이 계속 보임
**English:** Refresh the browser. If needed, wait briefly for caching. Confirm you clicked **변경 저장** or the correct upload button.  
**한국어:** 브라우저를 새로고침합니다. 필요하면 캐시 반영을 잠시 기다립니다. **변경 저장** 또는 올바른 업로드 버튼을 눌렀는지 확인합니다.

### Translation looks unnatural / 번역이 어색함
**English:** Edit the Korean source first and save again. If the translated field is read-only, ask the technical administrator to adjust the translation source or backend behavior.  
**한국어:** 먼저 한국어 원문을 자연스럽게 수정한 뒤 다시 저장합니다. 번역 필드가 읽기 전용이면 기술 관리자에게 번역 원문 또는 백엔드 동작 조정을 요청합니다.

---

## 16. Security rules / 보안 원칙

**English**
- Do not share admin passwords in group chats.
- Use owner accounts only for people who need account-management authority.
- Deactivate accounts when staff roles change.
- Do not upload private photos, personal documents, or financial records to the public website.
- Log out after using a shared computer.
- If you suspect a password was exposed, reset it immediately.

**한국어**
- 관리자 비밀번호를 단체 채팅에 공유하지 않습니다.
- 계정 관리 권한이 필요한 사람에게만 owner 권한을 부여합니다.
- 담당자가 바뀌면 계정을 비활성화합니다.
- 개인 사진, 개인정보 문서, 재정 자료를 공개 웹사이트에 업로드하지 않습니다.
- 공용 컴퓨터 사용 후 반드시 로그아웃합니다.
- 비밀번호가 노출된 것 같으면 즉시 변경합니다.

---

## 17. Recommended routine / 권장 운영 루틴

**English**
Weekly:
1. Upload the new bulletin.
2. Update weekly news/sermon title if needed.
3. Confirm worship times and contact info are still accurate.
4. Add one or more public-safe photos when appropriate.
5. Check the public homepage on phone and desktop.

Monthly:
1. Review admin user list.
2. Deactivate unused accounts.
3. Review hero text and visitor information.
4. Confirm media and bulletin links still work.

**한국어**
매주:
1. 새 주보를 업로드합니다.
2. 필요하면 주간 소식/설교 제목을 수정합니다.
3. 예배 시간과 연락처가 여전히 정확한지 확인합니다.
4. 공개 가능한 사진이 있으면 추가합니다.
5. 휴대폰과 데스크톱에서 공개 홈페이지를 확인합니다.

매월:
1. 관리자 목록을 점검합니다.
2. 사용하지 않는 계정을 비활성화합니다.
3. 첫 화면 문구와 방문자 안내를 검토합니다.
4. 미디어와 주보 링크가 정상 작동하는지 확인합니다.

---

## 18. What to send when requesting technical help / 기술 지원 요청 시 전달할 정보

**English**
Send:
- Which tab you were using.
- What action you clicked.
- The exact error message.
- File type and file size if upload failed.
- Whether you were logged in through Cloudflare Access.
- Screenshot if possible.

Do not send passwords or secret keys.

**한국어**
다음 정보를 전달합니다.
- 사용 중이던 탭
- 누른 버튼/작업
- 정확한 오류 메시지
- 업로드 실패 시 파일 형식과 용량
- Cloudflare Access 인증 여부
- 가능하면 스크린샷

비밀번호나 비밀 키는 보내지 않습니다.
