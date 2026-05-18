(() => {
  const buttons = Array.from(document.querySelectorAll('[data-lang]'));

  const translations = {
    ko: {
      title: 'KCOC — Korean Church of Columbus | 콜럼버스 한인교회',
      description: 'Korean Church of Columbus / 콜럼버스 한인교회 공식 웹사이트입니다. 예배 시간, 방문 안내, 말씀 영상, 다음세대, 한글학교와 교회 위치를 안내합니다.',
      dir: 'ltr',
      text: {
        skip: '본문으로 바로가기',
        'nav.visit': '처음 오셨나요',
        'nav.about': '교회소개',
        'nav.worship': '예배',
        'nav.media': '말씀과 사진',
        'nav.bulletins': '주보',
        'nav.nextgen': '다음세대',
        'nav.community': '공동체',
        'nav.contact': '오시는 길',
        'nav.watch': '온라인 예배',
        'hero.kicker': 'Korean Church of Columbus',
        'hero.title': '예수 그리스도의 사랑으로<br>여러분을 환영합니다',
        'hero.lead': '콜럼버스 한인교회는 말씀과 성령 안에서 예배하고, 성도를 세우며, 한 영혼과 다음 세대를 복음으로 섬기는 믿음의 공동체입니다.',
        'cta.visit': '처음 방문 안내',
        'cta.worship': '예배 시간 보기',
        'cta.directions': '오시는 길',
        'cta.map': 'Google 지도에서 보기',
        'cta.contact': '교회에 문의하기',
        'panel.title': '이번 주 예배',
        'panel.korean': '주일 장년 예배',
        'panel.koreanSub': '한국어 예배',
        'panel.english': 'English Worship',
        'panel.englishSub': 'English Congregation',
        'panel.children': '교회학교',
        'panel.childrenSub': '어린이 예배와 교육',
        'panel.midweek': '수요예배',
        'panel.midweekSub': '말씀과 기도',
        'time.sundayKo': '9:00 / 11:00 AM',
        'time.sundayEn': '9:00 / 11:00 AM',
        'time.children': '11:00 AM',
        'time.midweek': '7:00 PM',
        'strip.addressLabel': '주소',
        'strip.phoneLabel': '전화',
        'strip.emailLabel': '이메일',
        'address.full': '2825 Snouffer Rd, Columbus, OH 43235',
        'visit.kicker': 'New Here',
        'visit.title': '주님은 오늘 당신에게 사랑한다고 말씀하십니다',
        'visit.lead': '예배 시간과 자녀 예배, 새가족 안내와 오시는 길을 한눈에 보실 수 있도록 준비했습니다. 낯선 방문이 아니라 믿음의 여정이 시작되는 자리로 초대합니다.',
        'visit.step1Title': '예배의 자리로 초대합니다',
        'visit.step1Text': '주일예배와 영어예배 가운데 말씀과 찬양, 기도로 하나님께 나아갑니다.',
        'visit.step2Title': '자녀와 다음세대를 세웁니다',
        'visit.step2Text': '교회학교와 Youth가 복음 안에서 자라고, 가정과 교회가 함께 다음세대를 세워갑니다.',
        'visit.step3Title': '새가족과 교제의 자리',
        'visit.step3Text': '처음 오신 분도 예배와 공동체에 자연스럽게 연결되도록 새가족 안내와 교제를 돕겠습니다.',
        'about.kicker': '교회소개',
        'about.title': '콜럼버스 한인교회를 소개합니다',
        'about.lead': '콜럼버스 한인교회는 예배와 말씀, 기도와 공동체 안에서 성도를 세우고 다음 세대와 지역을 복음으로 섬기는 교회입니다.',
        'about.value1': '말씀과 성령으로 사역하는 교회',
        'about.value2': '예배와 소그룹 공동체로 함께 세워지는 교회',
        'about.value3': '한 영혼과 열방, 다음 세대를 섬기는 교회',
        'about.photoTitle': '주의 사랑 안에서 함께 걷는 믿음의 공동체',
        'about.photoText': '처음 방문하신 분도 예배와 교제 가운데 자연스럽게 연결되도록 섬기겠습니다.',
        'staff.kicker': '섬기는 사람들',
        'staff.title': '섬기는 사람들',
        'staff.lead': '각 사역을 맡은 교역자들이 예배, 다음세대, 교육과 돌봄의 자리에서 성도와 가정을 섬깁니다.',
        'staff.jung.name': '정지웅',
        'staff.jung.role': '담임목사',
        'staff.jung.text': '말씀과 예배, 교회의 비전과 목양을 섬깁니다.',
        'staff.lee.name': '이성영',
        'staff.lee.role': '목사 · 어린이, 에녹회',
        'staff.lee.text': '어린이 사역과 에녹회를 돌보며 세대를 잇는 신앙을 섬깁니다.',
        'staff.simon.name': 'Simon Baik',
        'staff.simon.role': '전도사',
        'staff.simon.text': '교회 공동체와 사역의 자리에서 성도들을 섬깁니다.',
        'staff.jed.name': 'Jed Yi',
        'staff.jed.role': '전도사 · 청소년',
        'staff.jed.text': '청소년들이 말씀 안에서 믿음과 정체성을 세워가도록 섬깁니다.',
        'worship.kicker': 'Worship',
        'worship.title': '예배와 말씀',
        'worship.lead': '주일예배와 수요예배, 새벽기도와 성경공부를 통해 말씀의 은혜 안에 거하고 기도로 삶을 세워갑니다.',
        'worship.card1Meta': 'Korean Worship',
        'worship.card1Title': '주일 장년 예배',
        'worship.card1Time': '1부 오전 9시<br>2부 오전 11시',
        'worship.card1Text': '말씀과 찬양, 기도로 함께 하나님께 나아가는 주일 공동체 예배입니다.',
        'worship.card2Meta': 'English Congregation',
        'worship.card2Title': '주일 영어 예배',
        'worship.card2Time': '1st 9:00 AM<br>2nd 11:00 AM',
        'worship.card2Text': '영어권 성도와 가정, 학생들이 함께 예배하고 교제하는 공동체입니다.',
        'worship.card3Meta': 'Midweek',
        'worship.card3Title': '주중 예배와 기도',
        'worship.card3Time': '수요예배 오후 7시<br>새벽기도 매일 오전 6시',
        'worship.card3Text': '주중에도 말씀과 기도 안에서 삶을 세워가는 시간입니다.',
        'media.kicker': 'Sermons & Media',
        'media.title': '말씀의 은혜와 교회 이야기',
        'media.lead': '말씀 영상과 교회 사진을 통해 예배의 은혜, 섬김의 발걸음, 공동체의 이야기를 함께 나눕니다.',
        'media.channel': 'YouTube 채널',
        'media.photoTitle': '예배와 교제 안에서 세워지는 믿음의 공동체',
        'media.photoText': '교회 사진은 대표 이미지와 썸네일로 정돈되어 예배, 교제, 다음세대의 순간을 품격 있게 보여줍니다.',
        'media.videoKicker': 'Latest Teaching',
        'media.videoTitle': '수요예배 말씀 다시보기',
        'media.videoText': '재생목록에서 최근 말씀을 이어서 볼 수 있습니다.',
        'media.playlist': '수요예배 영상',
        'media.channelShort': '공식 채널',
        'next.kicker': 'Next Generation',
        'next.title': '다음세대를 세우는 교회',
        'next.lead': '어린이와 청소년, 청년과 영어권 성도가 말씀 안에서 자라고 교회의 다음 세대로 세워지도록 섬깁니다.',
        'next.card1Meta': 'Children',
        'next.card1Title': '교회학교',
        'next.card1Text': '주일 오전 11시, 어린이들이 예배와 말씀 안에서 자라도록 돕습니다.',
        'next.card1Time': '주일 11:00 AM',
        'next.card2Meta': 'Youth',
        'next.card2Title': '중고등부',
        'next.card2Text': '청소년들이 말씀과 공동체 안에서 정체성과 믿음을 세워갑니다.',
        'next.card2Time': '금요일 7:00 PM',
        'next.card3Meta': 'Young Adults',
        'next.card3Title': '청년부',
        'next.card3Text': '청년들이 예배, 말씀, 교제 안에서 믿음의 여정을 함께 걷습니다.',
        'next.card3Time': '금요일 7:00 PM',
        'next.card4Meta': 'English Ministry',
        'next.card4Title': 'English Ministry',
        'next.card4Text': 'English-speaking members can worship, serve, and belong in community.',
        'next.card4Time': 'Sunday 9:00 / 11:00 AM',
        'next.card5Meta': 'Korean School',
        'next.card5Title': 'KCC Korean School',
        'next.card5Text': '한국어와 문화를 다음 세대에 전하는 교육 사역입니다.',
        'next.card5Time': '문의 필요',
        'next.card6Meta': 'Bible Study',
        'next.card6Title': '성경공부',
        'next.card6Text': '청년부, 영어부, 중고등부 교사반 등 말씀 안에서 함께 배우는 모임입니다.',
        'next.card6Time': '주중 모임',
        'vision.kicker': 'Community & Mission',
        'vision.title': '교회 비전과 사명',
        'vision.lead': '2026년 표어 “다시 기초를 쌓으라” 아래, 말씀과 성령으로 사역하고 예배와 소그룹 공동체 안에서 성도를 세워갑니다.',
        'vision.statement': '한 영혼과 열방과 다음 세대를 살리는 교회',
        'vision.item1': '말씀과 성령으로 사역하는 교회',
        'vision.item2': '예배와 소그룹 공동체의 교회',
        'vision.item3': '전 성도를 제자와 사역자로 세우는 교회',
        'vision.item4': '복음으로 한 영혼과 열방을 섬기는 교회',
        'vision.item5': '다음 세대를 일으키는 교회',
        'news.kicker': 'Bulletin & News',
        'news.title': '주보와 교회 소식',
        'news.lead': '주일예배 주보와 교회 소식을 웹 안에서 바로 보고, 필요한 경우 내려받을 수 있도록 준비했습니다.',
        'news.latest': '최근 교회소식',
        'news.label1': 'Bulletin',
        'news.item1': '2026년 5월 17일 주보 정보 반영',
        'news.label2': 'Sermon',
        'news.item2': '사랑의 복음이 충만한 가정',
        'news.label3': 'Reading',
        'news.item3': '에베소서 5:21–28',
        'news.staff': '섬기는 사람들',
        'news.staffText': '정지웅 담임 목사, 이성영 목사, Jedi Yi 전도사, Simon Baik 전도사가 각 사역을 섬기고 있습니다.',
        'contact.kicker': 'Visit Us',
        'contact.title': '오시는 길',
        'contact.lead': '예배 방문, 새가족 안내, 자녀 교육과 사역 문의가 필요하시면 연락해 주세요.',
        'contact.churchLabel': 'Church',
        'contact.addressLabel': 'Address',
        'contact.phoneLabel': 'Phone',
        'contact.emailLabel': 'Email',
        'contact.mapTitle': '2825 Snouffer Rd, Columbus, OH 43235',
        'contact.mapText': '주일 예배와 방문 안내가 필요하시면 언제든 문의해 주세요.',
        'bulletin.emptyTitle': '최근 주보 뷰어',
        'bulletin.emptyText': '관리 페이지에서 PDF 또는 이미지 주보를 올리면 이곳에서 주일예배 주보를 바로 볼 수 있습니다.',
        'bulletin.note': '업로드된 주보는 웹 뷰어와 다운로드 링크를 함께 제공합니다.',
        'bulletin.previewLabel': '한 페이지씩 보기',
        'bulletin.pageLabel': '페이지',
        'bulletin.nextPage': '다음 페이지',
        'bulletin.prevPage': '이전 페이지',
        'bulletin.pageStatus': '페이지 {page} / {total}',
        'bulletin.clickHint': '오른쪽을 누르면 다음 페이지, 왼쪽을 누르면 이전 페이지가 열립니다.',
        'bulletin.loading': '주보 미리보기를 준비 중입니다.',
        'bulletin.fallback': '웹 미리보기를 불러오지 못했습니다. 아래 다운로드 버튼으로 주보를 열어 주세요.',
        'bulletin.download': '주보 다운로드',
        'news.sermonTitle': '이번 주 말씀',
        'gallery.kicker': 'Church Photos',
        'gallery.title': '교회 앨범',
        'gallery.lead': '예배와 교제, 사역과 다음세대의 사진을 대표 사진과 썸네일 그리드로 정돈해 교회 이야기를 아름답게 전합니다.',
        'gallery.note': '관리 페이지에서 사진을 올리면 공개 교회 앨범에 반영되도록 준비했습니다.',
        'footer.tagline': '콜럼버스 한인교회 공식 웹사이트',
        'footer.domainLabel': '도메인'
      }
    },
    en: {
      title: 'KCOC — Korean Church of Columbus',
      description: 'Korean Church of Columbus is a Korean-American church in Columbus, Ohio. Find worship times, directions, children and youth ministries, sermons, and church contact information.',
      dir: 'ltr',
      text: {
        skip: 'Skip to main content',
        'nav.visit': 'New Here',
        'nav.about': 'About',
        'nav.worship': 'Worship',
        'nav.media': 'Teaching & Photos',
        'nav.bulletins': 'Bulletins',
        'nav.nextgen': 'Next Generation',
        'nav.community': 'Community',
        'nav.contact': 'Visit Us',
        'nav.watch': 'Online Worship',
        'hero.kicker': 'Korean Church of Columbus',
        'hero.title': 'Welcome in the love<br>of Jesus Christ',
        'hero.lead': 'Korean Church of Columbus is a gospel community worshiping in the Word and Spirit, building up believers, and serving one soul and the next generation in Christ.',
        'cta.visit': 'Plan your visit',
        'cta.worship': 'See worship times',
        'cta.directions': 'Get directions',
        'cta.map': 'Open in Google Maps',
        'cta.contact': 'Contact us',
        'panel.title': 'This Sunday',
        'panel.korean': 'Korean Worship',
        'panel.koreanSub': 'Korean-language service',
        'panel.english': 'English Worship',
        'panel.englishSub': 'English Congregation',
        'panel.children': 'Sunday School',
        'panel.childrenSub': 'Children’s worship and learning',
        'panel.midweek': 'Wednesday Worship',
        'panel.midweekSub': 'Word and prayer',
        'time.sundayKo': '9:00 / 11:00 AM',
        'time.sundayEn': '9:00 / 11:00 AM',
        'time.children': '11:00 AM',
        'time.midweek': '7:00 PM',
        'strip.addressLabel': 'Address',
        'strip.phoneLabel': 'Phone',
        'strip.emailLabel': 'Email',
        'address.full': '2825 Snouffer Rd, Columbus, OH 43235',
        'visit.kicker': 'New Here',
        'visit.title': 'There is a place for you in worship and community',
        'visit.lead': 'Find worship times, children’s ministry, newcomer guidance, and directions so your first visit can become the beginning of a faith journey with us.',
        'visit.step1Title': 'Join us for worship',
        'visit.step1Text': 'Check the Korean and English worship times and come before God with us on Sunday.',
        'visit.step2Title': 'Bring the next generation',
        'visit.step2Text': 'Sunday School and Youth ministry help children and students grow in the Word.',
        'visit.step3Title': 'Plan your visit',
        'visit.step3Text': 'If this is your first visit, contact us and we will help you connect to worship and fellowship.',
        'about.kicker': 'About KCOC',
        'about.title': 'Introducing Korean Church of Columbus',
        'about.lead': 'Korean Church of Columbus builds up believers through worship, the Word, prayer, and community, serving the next generation and our neighbors with the gospel.',
        'about.value1': 'Serving by the Word and the Spirit',
        'about.value2': 'Being formed through worship and small-group community',
        'about.value3': 'Serving one soul, the nations, and the next generation',
        'about.photoTitle': 'A faith community walking together in Christ’s love',
        'about.photoText': 'We help first-time visitors connect naturally through worship, fellowship, and care.',
        'staff.kicker': 'Serving Staff',
        'staff.title': 'Serving Staff',
        'staff.lead': 'Our pastors and ministry leaders serve families through worship, the next generation, education, and pastoral care.',
        'staff.jung.name': 'Jiwong Chung',
        'staff.jung.role': 'Senior Pastor',
        'staff.jung.text': 'Serving the church through preaching, worship, vision, and pastoral care.',
        'staff.lee.name': 'Sungyoung Lee',
        'staff.lee.role': 'Pastor · Children, Enoch Fellowship',
        'staff.lee.text': 'Serving children’s ministry and Enoch Fellowship, connecting generations in faith.',
        'staff.simon.name': 'Simon Baik',
        'staff.simon.role': 'Evangelist',
        'staff.simon.text': 'Serving the church community and ministries with care.',
        'staff.jed.name': 'Jed Yi',
        'staff.jed.role': 'Evangelist · Youth',
        'staff.jed.text': 'Serving youth as they grow in faith and identity through the Word.',
        'worship.kicker': 'Worship',
        'worship.title': 'Worship and the Word',
        'worship.lead': 'We gather for Sunday worship, midweek worship, dawn prayer, and Bible study to abide in the grace of God’s Word.',
        'worship.card1Meta': 'Korean Worship',
        'worship.card1Title': 'Sunday Korean Worship',
        'worship.card1Time': '1st 9:00 AM<br>2nd 11:00 AM',
        'worship.card1Text': 'A Sunday gathering where we come before God together through the Word, praise, and prayer.',
        'worship.card2Meta': 'English Congregation',
        'worship.card2Title': 'Sunday English Worship',
        'worship.card2Time': '1st 9:00 AM<br>2nd 11:00 AM',
        'worship.card2Text': 'A worshiping community for English-speaking members, families, and students.',
        'worship.card3Meta': 'Midweek',
        'worship.card3Title': 'Midweek Worship and Prayer',
        'worship.card3Time': 'Wednesday 7:00 PM<br>Daily dawn prayer 6:00 AM',
        'worship.card3Text': 'A time to be formed by Scripture and prayer throughout the week.',
        'media.kicker': 'Sermons & Media',
        'media.title': 'The Word and the Story of Our Church',
        'media.lead': 'Watch messages and see church photos that tell the story of worship, service, fellowship, and the next generation.',
        'media.channel': 'YouTube Channel',
        'media.photoTitle': 'A community growing through worship and fellowship',
        'media.photoText': 'Uploaded photos are arranged responsively so church life remains balanced and easy to view.',
        'media.videoKicker': 'Latest Teaching',
        'media.videoTitle': 'Watch Wednesday worship messages',
        'media.videoText': 'Continue watching recent messages through the playlist.',
        'media.playlist': 'Wednesday videos',
        'media.channelShort': 'Official channel',
        'next.kicker': 'Next Generation',
        'next.title': 'Raising the Next Generation',
        'next.lead': 'We serve children, youth, young adults, and English-speaking members so they may grow in the Word and be raised as the next generation of the church.',
        'next.card1Meta': 'Children',
        'next.card1Title': 'Sunday School',
        'next.card1Text': 'Children grow through worship and the Word at 11:00 AM on Sundays.',
        'next.card1Time': 'Sunday 11:00 AM',
        'next.card2Meta': 'Youth',
        'next.card2Title': 'Youth Group',
        'next.card2Text': 'Students build identity and faith through Scripture and community.',
        'next.card2Time': 'Friday 7:00 PM',
        'next.card3Meta': 'Young Adults',
        'next.card3Title': 'Young Adults',
        'next.card3Text': 'Young adults walk the journey of faith together through worship, the Word, and fellowship.',
        'next.card3Time': 'Friday 7:00 PM',
        'next.card4Meta': 'English Ministry',
        'next.card4Title': 'English Ministry',
        'next.card4Text': 'English-speaking members can worship, serve, and belong in community.',
        'next.card4Time': 'Sunday 9:00 / 11:00 AM',
        'next.card5Meta': 'Korean School',
        'next.card5Title': 'KCC Korean School',
        'next.card5Text': 'An educational ministry sharing Korean language and culture with the next generation.',
        'next.card5Time': 'Contact for details',
        'next.card6Meta': 'Bible Study',
        'next.card6Title': 'Bible Study',
        'next.card6Text': 'Young adults, English Ministry, and teacher groups learn together in the Word.',
        'next.card6Time': 'Weekday gatherings',
        'vision.kicker': 'Community & Mission',
        'vision.title': 'Vision and Mission',
        'vision.lead': 'Under the 2026 theme, “Rebuild the Foundation,” we seek to serve by the Word and the Spirit and build up believers through worship and small-group community.',
        'vision.statement': 'A church that gives life to one soul, the nations, and the next generation',
        'vision.item1': 'Serving by the Word and the Spirit',
        'vision.item2': 'A worshiping and small-group community',
        'vision.item3': 'Raising every believer as a disciple and servant',
        'vision.item4': 'Serving one soul and the nations through the gospel',
        'vision.item5': 'Raising the next generation',
        'news.kicker': 'Bulletin & News',
        'news.title': 'Bulletin and Church News',
        'news.lead': 'Sunday bulletins and church news can be viewed directly on the website or downloaded when needed.',
        'news.latest': 'Latest Church News',
        'news.label1': 'Bulletin',
        'news.item1': 'May 17, 2026 bulletin information added',
        'news.label2': 'Sermon',
        'news.item2': 'A Family Filled with the Gospel and Love',
        'news.label3': 'Reading',
        'news.item3': 'Ephesians 5:21–28',
        'news.staff': 'Serving Staff',
        'news.staffText': 'Rev. Jiwong Chung, Rev. Sungyoung Lee, Evangelist Jedi Yi, and Evangelist Simon Baik serve the ministries of the church.',
        'contact.kicker': 'Visit Us',
        'contact.title': 'Directions and Contact',
        'contact.lead': 'Contact us if you need help with worship visits, newcomer guidance, children’s education, or ministry questions.',
        'contact.churchLabel': 'Church',
        'contact.addressLabel': 'Address',
        'contact.phoneLabel': 'Phone',
        'contact.emailLabel': 'Email',
        'contact.mapTitle': '2825 Snouffer Rd, Columbus, OH 43235',
        'contact.mapText': 'Contact us anytime if you need guidance for Sunday worship or your first visit.',
        'bulletin.emptyTitle': 'Recent bulletin viewer',
        'bulletin.emptyText': 'Upload a PDF or image bulletin in the admin page and it can be viewed here on the website.',
        'bulletin.note': 'Uploaded bulletins include both an onsite viewer and a download link.',
        'bulletin.previewLabel': 'One page at a time',
        'bulletin.pageLabel': 'Page',
        'bulletin.nextPage': 'Next page',
        'bulletin.prevPage': 'Previous page',
        'bulletin.pageStatus': 'Page {page} of {total}',
        'bulletin.clickHint': 'Click the right side for the next page, or the left side for the previous page.',
        'bulletin.loading': 'Preparing the bulletin preview.',
        'bulletin.fallback': 'The web preview could not be loaded. Please open the bulletin with the download button below.',
        'bulletin.download': 'Download bulletin',
        'news.sermonTitle': 'This Week’s Message',
        'gallery.kicker': 'Church Photos',
        'gallery.title': 'Church Album',
        'gallery.lead': 'Photos from worship, fellowship, ministry, and the next generation are arranged as a featured image and refined thumbnail grid.',
        'gallery.note': 'The API is prepared so photos uploaded from the admin page can appear in the public gallery.',
        'footer.tagline': 'Official website of Korean Church of Columbus',
        'footer.domainLabel': 'Domain'
      }
    },
    zh: {
      title: 'KCOC — 哥伦布韩人教会',
      description: '哥伦布韩人教会官方网站。这里提供礼拜时间、首次来访指南、讲道视频、下一代事工、韩文学校、地址与联系方式。',
      dir: 'ltr',
      text: {
        skip: '跳到主要内容',
        'nav.visit': '首次来访',
        'nav.about': '教会介绍',
        'nav.worship': '礼拜',
        'nav.media': '讲道与照片',
        'nav.bulletins': '周报',
        'nav.nextgen': '下一代',
        'nav.community': '共同体',
        'nav.contact': '地址',
        'nav.watch': '线上礼拜',
        'hero.kicker': 'Korean Church of Columbus',
        'hero.title': '在耶稣基督的爱中欢迎您',
        'hero.lead': '哥伦布韩人教会是在圣经话语和圣灵中敬拜、建立信徒，并以福音服事一个灵魂与下一代的信仰共同体。',
        'cta.visit': '首次来访指南',
        'cta.worship': '查看礼拜时间',
        'cta.directions': '查看地址',
        'cta.map': '在 Google 地图中打开',
        'cta.contact': '联系我们',
        'panel.title': '本周礼拜',
        'panel.korean': '主日成人礼拜',
        'panel.koreanSub': '韩语礼拜',
        'panel.english': '英语礼拜',
        'panel.englishSub': 'English Congregation',
        'panel.children': '主日学校',
        'panel.childrenSub': '儿童礼拜与教育',
        'panel.midweek': '周三礼拜',
        'panel.midweekSub': '圣经话语与祷告',
        'time.sundayKo': '9:00 / 11:00 AM',
        'time.sundayEn': '9:00 / 11:00 AM',
        'time.children': '11:00 AM',
        'time.midweek': '7:00 PM',
        'strip.addressLabel': '地址',
        'strip.phoneLabel': '电话',
        'strip.emailLabel': '电子邮件',
        'address.full': '2825 Snouffer Rd, Columbus, OH 43235',
        'visit.kicker': 'New Here',
        'visit.title': '首次来访的朋友也在主爱中受欢迎',
        'visit.lead': '礼拜时间、儿童事工、地址与联系方式都整理在这里，方便来访前确认。',
        'visit.step1Title': '确认礼拜时间',
        'visit.step1Text': '主日韩语礼拜和英语礼拜时间为上午 9 点和 11 点。',
        'visit.step2Title': '与孩子一同来访',
        'visit.step2Text': '主日学校和 Youth 说明帮助孩子和学生安心敬拜与学习。',
        'visit.step3Title': '找到教会地址',
        'visit.step3Text': '请前往 2825 Snouffer Rd。首次来访前若有问题，欢迎联系我们。',
        'about.kicker': '教会介绍',
        'about.title': '哥伦布韩人教会介绍',
        'about.lead': '哥伦布韩人教会在礼拜、圣经话语、祷告与共同体中建立信徒，并以福音服事下一代和地区。',
        'about.value1': '以圣经话语和圣灵服事的教会',
        'about.value2': '通过礼拜与小组共同体一起被建立的教会',
        'about.value3': '服事一个灵魂、万民与下一代的教会',
        'about.photoTitle': '在主爱中同行的信仰共同体',
        'about.photoText': '我们帮助首次来访者自然连接到礼拜与团契。',
        'staff.kicker': '服事同工',
        'staff.title': '服事同工',
        'staff.lead': '教牧同工在礼拜、下一代、教育与关怀中服事会众和家庭。',
        'staff.jung.name': '郑智雄',
        'staff.jung.role': '主任牧师',
        'staff.jung.text': '以讲道、礼拜、异象和牧养服事教会。',
        'staff.lee.name': '李成英',
        'staff.lee.role': '牧师 · 儿童、以诺会',
        'staff.lee.text': '服事儿童事工与以诺会，连接不同世代的信仰。',
        'staff.simon.name': 'Simon Baik',
        'staff.simon.role': '传道',
        'staff.simon.text': '在教会共同体与事工中服事会众。',
        'staff.jed.name': 'Jed Yi',
        'staff.jed.role': '传道 · 青少年',
        'staff.jed.text': '帮助青少年在圣经话语中建立信仰与身份。',
        'worship.kicker': 'Worship',
        'worship.title': '礼拜说明',
        'worship.lead': '一目了然地查看主日礼拜、周中礼拜、晨祷和圣经学习时间。',
        'worship.card1Meta': 'Korean Worship',
        'worship.card1Title': '主日韩语礼拜',
        'worship.card1Time': '第一堂 9:00 AM<br>第二堂 11:00 AM',
        'worship.card1Text': '通过圣经话语、赞美与祷告，一同来到神面前的主日礼拜。',
        'worship.card2Meta': 'English Congregation',
        'worship.card2Title': '主日英语礼拜',
        'worship.card2Time': '第一堂 9:00 AM<br>第二堂 11:00 AM',
        'worship.card2Text': '为英语会众、家庭和学生预备的敬拜共同体。',
        'worship.card3Meta': 'Midweek',
        'worship.card3Title': '周中礼拜与祷告',
        'worship.card3Time': '周三 7:00 PM<br>每日晨祷 6:00 AM',
        'worship.card3Text': '在一周当中继续被圣经话语与祷告塑造的时间。',
        'media.kicker': 'Sermons & Media',
        'media.title': '圣经话语的恩典与教会故事',
        'media.lead': '可在官方 YouTube 频道观看礼拜和讲道视频。照片以克制清晰的方式呈现教会共同体的温暖。',
        'media.channel': 'YouTube 频道',
        'media.photoTitle': '一起敬拜、一起成长的共同体',
        'media.photoText': '通过照片介绍礼拜、团契和下一代事工。',
        'media.videoKicker': 'Latest Teaching',
        'media.videoTitle': '观看周三礼拜讲道',
        'media.videoText': '可通过播放列表继续观看最近的讲道。',
        'media.playlist': '周三礼拜视频',
        'media.channelShort': '官方频道',
        'next.kicker': 'Next Generation',
        'next.title': '下一代与教育',
        'next.lead': '连接儿童、青少年、青年、英语会众和家庭，使他们在信仰中成长。',
        'next.card1Meta': 'Children',
        'next.card1Title': '主日学校',
        'next.card1Text': '儿童在主日上午 11 点通过礼拜与圣经话语成长。',
        'next.card1Time': '主日 11:00 AM',
        'next.card2Meta': 'Youth',
        'next.card2Title': '中高等部',
        'next.card2Text': '学生们在圣经话语与共同体中建立身份与信仰。',
        'next.card2Time': '周五 7:00 PM',
        'next.card3Meta': 'Young Adults',
        'next.card3Title': '青年部',
        'next.card3Text': '青年们在礼拜、圣经话语与团契中同行信仰旅程。',
        'next.card3Time': '周五 7:00 PM',
        'next.card4Meta': 'English Ministry',
        'next.card4Title': 'English Ministry',
        'next.card4Text': '英语会众可以在共同体中敬拜、服事并归属。',
        'next.card4Time': 'Sunday 9:00 / 11:00 AM',
        'next.card5Meta': 'Korean School',
        'next.card5Title': 'KCC 韩文学校',
        'next.card5Text': '向下一代传递韩国语言与文化的教育事工。',
        'next.card5Time': '请咨询',
        'next.card6Meta': 'Bible Study',
        'next.card6Title': '圣经学习',
        'next.card6Text': '青年部、英语部、中高等部教师班等一起在圣经话语中学习。',
        'next.card6Time': '周中聚会',
        'vision.kicker': 'Community & Mission',
        'vision.title': '教会异象',
        'vision.lead': '在 2026 年主题“重新立定根基”之下，我们以圣经话语和圣灵服事，并在礼拜与小组共同体中建立信徒。',
        'vision.statement': '使一个灵魂、万民与下一代得生命的教会',
        'vision.item1': '以圣经话语和圣灵服事的教会',
        'vision.item2': '礼拜与小组共同体的教会',
        'vision.item3': '建立每位信徒成为门徒与服事者的教会',
        'vision.item4': '以福音服事一个灵魂和万民的教会',
        'vision.item5': '兴起下一代的教会',
        'news.kicker': 'Bulletin & News',
        'news.title': '周报与教会消息',
        'news.lead': '最近周报可在网页中直接查看，也可按需要下载。',
        'news.latest': '最新消息',
        'news.label1': 'Bulletin',
        'news.item1': '已加入 2026 年 5 月 17 日周报信息',
        'news.label2': 'Sermon',
        'news.item2': '充满福音与爱的家庭',
        'news.label3': 'Reading',
        'news.item3': '以弗所书 5:21–28',
        'news.staff': '服事同工',
        'news.staffText': '郑智雄主任牧师、李成英牧师、Jedi Yi 传道、Simon Baik 传道一起服事教会各项事工。',
        'contact.kicker': 'Visit Us',
        'contact.title': '地址与联系方式',
        'contact.lead': '若您需要礼拜来访、新来宾说明、儿童教育或事工咨询，请与我们联系。',
        'contact.churchLabel': '教会',
        'contact.addressLabel': '地址',
        'contact.phoneLabel': '电话',
        'contact.emailLabel': '电子邮件',
        'contact.mapTitle': '2825 Snouffer Rd, Columbus, OH 43235',
        'contact.mapText': '若您需要主日礼拜或首次来访说明，欢迎随时联系。',
        'bulletin.emptyTitle': '最近周报查看器',
        'bulletin.emptyText': '在管理页面上传 PDF 或图片周报后，可在这里直接查看。',
        'bulletin.note': '上传的周报会同时提供网页查看和下载链接。',
        'bulletin.previewLabel': '单页查看',
        'bulletin.pageLabel': '页',
        'bulletin.nextPage': '下一页',
        'bulletin.prevPage': '上一页',
        'bulletin.pageStatus': '第 {page} / {total} 页',
        'bulletin.clickHint': '点击右侧查看下一页，点击左侧返回上一页。',
        'bulletin.loading': '正在准备周报预览。',
        'bulletin.fallback': '网页预览无法载入。请使用下方下载按钮打开周报。',
        'bulletin.download': '下载周报',
        'news.sermonTitle': '本周讲道',
        'gallery.kicker': 'Church Photos',
        'gallery.title': '教会相册',
        'gallery.lead': '上传的照片会自动整理为代表照片和缩略图，即使比例不同也保持页面美观。',
        'gallery.note': '管理页面上传照片后，可通过 API 反映到公开照片区。',
        'footer.tagline': '哥伦布韩人教会官方网站',
        'footer.domainLabel': '域名'
      }
    },
    es: {
      title: 'KCOC — Korean Church of Columbus',
      description: 'Sitio oficial de Korean Church of Columbus. Encuentra horarios de culto, guía para visitantes, videos de mensajes, ministerios de próxima generación, escuela coreana, dirección y contacto.',
      dir: 'ltr',
      text: {
        skip: 'Saltar al contenido principal',
        'nav.visit': 'Primera visita',
        'nav.about': 'Acerca de',
        'nav.worship': 'Culto',
        'nav.media': 'Mensajes y fotos',
        'nav.bulletins': 'Boletines',
        'nav.nextgen': 'Próxima generación',
        'nav.community': 'Comunidad',
        'nav.contact': 'Visítanos',
        'nav.watch': 'Culto en línea',
        'hero.kicker': 'Korean Church of Columbus',
        'hero.title': 'Bienvenido en el amor de Jesucristo',
        'hero.lead': 'Korean Church of Columbus es una comunidad del evangelio que adora en la Palabra y el Espíritu, edifica a los creyentes y sirve a una alma y a la próxima generación en Cristo.',
        'cta.visit': 'Planifica tu visita',
        'cta.worship': 'Ver horarios',
        'cta.directions': 'Cómo llegar',
        'cta.map': 'Abrir en Google Maps',
        'cta.contact': 'Contáctanos',
        'panel.title': 'Este domingo',
        'panel.korean': 'Culto en coreano',
        'panel.koreanSub': 'Servicio en coreano',
        'panel.english': 'Culto en inglés',
        'panel.englishSub': 'English Congregation',
        'panel.children': 'Escuela dominical',
        'panel.childrenSub': 'Culto y enseñanza para niños',
        'panel.midweek': 'Culto de miércoles',
        'panel.midweekSub': 'Palabra y oración',
        'time.sundayKo': '9:00 / 11:00 AM',
        'time.sundayEn': '9:00 / 11:00 AM',
        'time.children': '11:00 AM',
        'time.midweek': '7:00 PM',
        'strip.addressLabel': 'Dirección',
        'strip.phoneLabel': 'Teléfono',
        'strip.emailLabel': 'Correo',
        'address.full': '2825 Snouffer Rd, Columbus, OH 43235',
        'visit.kicker': 'New Here',
        'visit.title': 'También si es tu primera visita, eres bienvenido en el amor del Señor',
        'visit.lead': 'La información esencial está reunida aquí: horarios de culto, ministerio de niños, ubicación y contacto.',
        'visit.step1Title': 'Confirma los horarios',
        'visit.step1Text': 'Los cultos dominicales en coreano e inglés son a las 9:00 AM y 11:00 AM.',
        'visit.step2Title': 'Ven con tus hijos',
        'visit.step2Text': 'La Escuela Dominical y Youth ayudan a niños y estudiantes a adorar y aprender con confianza.',
        'visit.step3Title': 'Encuentra la ubicación',
        'visit.step3Text': 'Visítanos en 2825 Snouffer Rd. Si vienes por primera vez, contáctanos y te ayudaremos a prepararte.',
        'about.kicker': 'Acerca de KCOC',
        'about.title': 'Conoce Korean Church of Columbus',
        'about.lead': 'Korean Church of Columbus edifica a los creyentes por medio del culto, la Palabra, la oración y la comunidad, sirviendo a la próxima generación y al vecindario con el evangelio.',
        'about.value1': 'Servir por la Palabra y el Espíritu',
        'about.value2': 'Ser formados juntos por el culto y la comunidad',
        'about.value3': 'Servir a un alma, a las naciones y a la próxima generación',
        'about.photoTitle': 'Una comunidad de fe que camina unida en el amor de Cristo',
        'about.photoText': 'Ayudamos a los visitantes a conectarse naturalmente por medio del culto, la comunión y el cuidado.',
        'staff.kicker': 'Equipo de servicio',
        'staff.title': 'Equipo de servicio',
        'staff.lead': 'Nuestros pastores y líderes sirven a las familias en el culto, la próxima generación, la educación y el cuidado pastoral.',
        'staff.jung.name': 'Jiwong Chung',
        'staff.jung.role': 'Pastor principal',
        'staff.jung.text': 'Sirve a la iglesia por medio de la predicación, el culto, la visión y el cuidado pastoral.',
        'staff.lee.name': 'Sungyoung Lee',
        'staff.lee.role': 'Pastor · Niños, Enoch Fellowship',
        'staff.lee.text': 'Sirve el ministerio de niños y Enoch Fellowship, conectando generaciones en la fe.',
        'staff.simon.name': 'Simon Baik',
        'staff.simon.role': 'Evangelista',
        'staff.simon.text': 'Sirve a la comunidad y los ministerios de la iglesia con cuidado.',
        'staff.jed.name': 'Jed Yi',
        'staff.jed.role': 'Evangelista · Jóvenes',
        'staff.jed.text': 'Sirve a los jóvenes mientras crecen en fe e identidad por medio de la Palabra.',
        'worship.kicker': 'Worship',
        'worship.title': 'Horarios de culto',
        'worship.lead': 'Consulta de un vistazo los cultos dominicales, el culto entre semana, la oración matutina y los estudios bíblicos.',
        'worship.card1Meta': 'Korean Worship',
        'worship.card1Title': 'Culto dominical en coreano',
        'worship.card1Time': '1er culto 9:00 AM<br>2º culto 11:00 AM',
        'worship.card1Text': 'Una reunión dominical para acercarnos juntos a Dios por medio de la Palabra, la alabanza y la oración.',
        'worship.card2Meta': 'English Congregation',
        'worship.card2Title': 'Culto dominical en inglés',
        'worship.card2Time': '1º 9:00 AM<br>2º 11:00 AM',
        'worship.card2Text': 'Una comunidad de adoración para miembros, familias y estudiantes de habla inglesa.',
        'worship.card3Meta': 'Midweek',
        'worship.card3Title': 'Culto entre semana y oración',
        'worship.card3Time': 'Miércoles 7:00 PM<br>Oración diaria 6:00 AM',
        'worship.card3Text': 'Un tiempo para ser formados por la Escritura y la oración durante la semana.',
        'media.kicker': 'Sermons & Media',
        'media.title': 'La gracia de la Palabra y la historia de la iglesia',
        'media.lead': 'Mira videos de culto y mensajes en el canal oficial de YouTube. Las fotos muestran la calidez de la comunidad con claridad y sobriedad.',
        'media.channel': 'Canal de YouTube',
        'media.photoTitle': 'Una comunidad que adora y crece junta',
        'media.photoText': 'Las fotos presentan la adoración, la comunión y el ministerio de próxima generación.',
        'media.videoKicker': 'Latest Teaching',
        'media.videoTitle': 'Ver mensajes del culto de miércoles',
        'media.videoText': 'Continúa viendo mensajes recientes en la lista de reproducción.',
        'media.playlist': 'Videos de miércoles',
        'media.channelShort': 'Canal oficial',
        'next.kicker': 'Next Generation',
        'next.title': 'Próxima generación y educación',
        'next.lead': 'Niños, jóvenes, jóvenes adultos, miembros de habla inglesa y familias se conectan para crecer en la fe.',
        'next.card1Meta': 'Children',
        'next.card1Title': 'Escuela dominical',
        'next.card1Text': 'Los niños crecen por medio de la adoración y la Palabra los domingos a las 11:00 AM.',
        'next.card1Time': 'Domingo 11:00 AM',
        'next.card2Meta': 'Youth',
        'next.card2Title': 'Grupo juvenil',
        'next.card2Text': 'Los estudiantes forman identidad y fe por medio de la Escritura y la comunidad.',
        'next.card2Time': 'Viernes 7:00 PM',
        'next.card3Meta': 'Young Adults',
        'next.card3Title': 'Jóvenes adultos',
        'next.card3Text': 'Los jóvenes adultos caminan juntos en la fe por medio de la adoración, la Palabra y la comunión.',
        'next.card3Time': 'Viernes 7:00 PM',
        'next.card4Meta': 'English Ministry',
        'next.card4Title': 'English Ministry',
        'next.card4Text': 'Los miembros de habla inglesa pueden adorar, servir y pertenecer en comunidad.',
        'next.card4Time': 'Sunday 9:00 / 11:00 AM',
        'next.card5Meta': 'Korean School',
        'next.card5Title': 'KCC Korean School',
        'next.card5Text': 'Un ministerio educativo que comparte el idioma y la cultura coreana con la próxima generación.',
        'next.card5Time': 'Consultar detalles',
        'next.card6Meta': 'Bible Study',
        'next.card6Title': 'Estudio bíblico',
        'next.card6Text': 'Jóvenes adultos, English Ministry y grupos de maestros aprenden juntos en la Palabra.',
        'next.card6Time': 'Reuniones entre semana',
        'vision.kicker': 'Community & Mission',
        'vision.title': 'Visión de la iglesia',
        'vision.lead': 'Bajo el tema de 2026, “Reconstruir el fundamento”, buscamos servir por la Palabra y el Espíritu y edificar creyentes por medio de la adoración y los grupos pequeños.',
        'vision.statement': 'Una iglesia que da vida a un alma, a las naciones y a la próxima generación',
        'vision.item1': 'Servir por la Palabra y el Espíritu',
        'vision.item2': 'Una comunidad de adoración y grupos pequeños',
        'vision.item3': 'Levantar a cada creyente como discípulo y servidor',
        'vision.item4': 'Servir a un alma y a las naciones por medio del evangelio',
        'vision.item5': 'Levantar a la próxima generación',
        'news.kicker': 'Bulletin & News',
        'news.title': 'Boletín y noticias',
        'news.lead': 'Los boletines recientes se pueden ver directamente en la web o descargar cuando sea necesario.',
        'news.latest': 'Últimas noticias',
        'news.label1': 'Bulletin',
        'news.item1': 'Información del boletín del 17 de mayo de 2026 agregada',
        'news.label2': 'Sermon',
        'news.item2': 'Una familia llena del evangelio y del amor',
        'news.label3': 'Reading',
        'news.item3': 'Efesios 5:21–28',
        'news.staff': 'Equipo de servicio',
        'news.staffText': 'Rev. Jiwong Chung, Rev. Sungyoung Lee, evangelista Jedi Yi y evangelista Simon Baik sirven los ministerios de la iglesia.',
        'contact.kicker': 'Visit Us',
        'contact.title': 'Dirección y contacto',
        'contact.lead': 'Contáctanos si necesitas ayuda con una visita al culto, orientación para nuevos visitantes, educación de niños o preguntas sobre ministerios.',
        'contact.churchLabel': 'Iglesia',
        'contact.addressLabel': 'Dirección',
        'contact.phoneLabel': 'Teléfono',
        'contact.emailLabel': 'Correo',
        'contact.mapTitle': '2825 Snouffer Rd, Columbus, OH 43235',
        'contact.mapText': 'Contáctanos cuando necesites orientación para el culto dominical o tu primera visita.',
        'bulletin.emptyTitle': 'Visor de boletines recientes',
        'bulletin.emptyText': 'Sube un PDF o imagen del boletín desde la página de administración y se podrá ver aquí.',
        'bulletin.note': 'Los boletines subidos ofrecen visor web y enlace de descarga.',
        'bulletin.previewLabel': 'Una página a la vez',
        'bulletin.pageLabel': 'Página',
        'bulletin.nextPage': 'Página siguiente',
        'bulletin.prevPage': 'Página anterior',
        'bulletin.pageStatus': 'Página {page} de {total}',
        'bulletin.clickHint': 'Haz clic en el lado derecho para la página siguiente, o en el izquierdo para volver.',
        'bulletin.loading': 'Preparando la vista previa del boletín.',
        'bulletin.fallback': 'No se pudo cargar la vista previa web. Abre el boletín con el botón de descarga abajo.',
        'bulletin.download': 'Descargar boletín',
        'news.sermonTitle': 'Mensaje de esta semana',
        'gallery.kicker': 'Church Photos',
        'gallery.title': 'Álbum de la iglesia',
        'gallery.lead': 'Las fotos subidas se organizan automáticamente como imagen principal y cuadrícula para mantener un diseño equilibrado.',
        'gallery.note': 'La API está preparada para mostrar en la galería pública las fotos subidas desde administración.',
        'footer.tagline': 'Sitio oficial de Korean Church of Columbus',
        'footer.domainLabel': 'Dominio'
      }
    }
  };


  const state = {
    lang: 'ko',
    gallery: [
      { id: 'seed-1', title: { ko: '예배와 교제', en: 'Worship and Community', zh: '敬拜与共同体', es: 'Culto y comunidad' }, caption: { ko: '교회 사진을 업로드하면 이 영역에 정돈된 갤러리로 표시됩니다.', en: 'Uploaded church photos appear here in a balanced gallery.', zh: '上传的教会照片会在这里整齐显示。', es: 'Las fotos subidas aparecerán aquí en una galería equilibrada.' }, url: 'media/existing-home/DSCF9332-1500x630.jpg' },
      { id: 'seed-2', title: { ko: '말씀과 찬양', en: 'Word and Praise', zh: '话语与赞美', es: 'Palabra y alabanza' }, caption: { ko: '예배의 은혜를 사진으로 나눕니다.', en: 'Sharing the grace of worship through photos.', zh: '用照片分享敬拜的恩典。', es: 'Compartiendo la gracia del culto por medio de fotos.' }, url: 'media/existing-home/XE1A9331-1-1500x630.jpg' },
      { id: 'seed-3', title: { ko: '사랑의 교제', en: 'Fellowship', zh: '团契', es: 'Comunión' }, caption: { ko: '주의 사랑 안에서 서로를 세워갑니다.', en: 'Building one another up in the love of Christ.', zh: '在主爱中彼此建立。', es: 'Edificándonos en el amor de Cristo.' }, url: 'media/existing-home/DSCF2315-1500x630.jpg' },
      { id: 'seed-4', title: { ko: '다음세대', en: 'Next Generation', zh: '下一代', es: 'Próxima generación' }, caption: { ko: '다음세대를 말씀 안에서 세웁니다.', en: 'Raising the next generation in the Word.', zh: '在话语中兴起下一代。', es: 'Levantando la próxima generación en la Palabra.' }, url: 'media/existing-home/VL6D2190-3-1500x630.jpg' }
    ],
    bulletins: [
      { id: 'seed-bulletin', title: { ko: '2026년 5월 17일 주보', en: 'May 17, 2026 Bulletin', zh: '2026年5月17日周报', es: 'Boletín del 17 de mayo de 2026' }, date: '2026-05-17', type: 'note', url: '', downloadUrl: '', summary: { ko: '관리 페이지에서 PDF 또는 이미지 주보를 업로드하면 웹 뷰어와 다운로드 링크가 이 자리에 표시됩니다.', en: 'Upload a PDF or image bulletin from the admin page and the viewer and download link will appear here.', zh: '从管理页面上传 PDF 或图片周报后，查看器和下载链接会显示在这里。', es: 'Sube un PDF o imagen del boletín desde administración y aparecerán aquí el visor y la descarga.' } }
    ],
    selectedPhoto: 0,
    selectedBulletin: 0
  };

  const localized = (value, fallback = '') => {
    if (value && typeof value === 'object') return value[state.lang] || value.ko || value.en || fallback;
    return value || fallback;
  };

  const safeUrl = (value) => {
    try {
      if (!value) return '';
      const url = new URL(value, window.location.href);
      return ['http:', 'https:'].includes(url.protocol) || url.origin === window.location.origin ? url.href : '';
    } catch (_) { return ''; }
  };

  let pdfjsPromise;
  const bulletinText = (key, fallback) => translations[state.lang]?.text[key] || translations.ko.text[key] || fallback;
  const formatBulletinText = (key, fallback, values = {}) => Object.entries(values).reduce(
    (text, [name, value]) => text.replaceAll(`{${name}}`, value),
    bulletinText(key, fallback)
  );
  const renderPdfPreview = async (viewer, pdfUrl, title, downloadHtml = '') => {
    const token = `${Date.now()}-${Math.random().toString(36).slice(2)}`;
    viewer.dataset.pdfToken = token;
    viewer.innerHTML = `<div class="bulletin-canvas-wrap"><div class="bulletin-paper"><span class="paper-date">PDF</span><h3>${escapeHtml(title)}</h3><p>${escapeHtml(bulletinText('bulletin.loading', 'Preparing bulletin preview.'))}</p></div></div>`;
    try {
      pdfjsPromise ||= import('/assets/vendor/pdf.mjs').then((pdfjs) => {
        pdfjs.GlobalWorkerOptions.workerSrc = '/assets/vendor/pdf.worker.mjs';
        return pdfjs;
      });
      const pdfjs = await pdfjsPromise;
      const pdf = await pdfjs.getDocument({ url: pdfUrl, withCredentials: false }).promise;
      const pageCount = Math.min(2, pdf.numPages || 1);
      const wrap = document.createElement('div');
      wrap.className = 'bulletin-canvas-wrap';
      const view = document.createElement('div');
      view.className = 'bulletin-page-view';
      const badge = document.createElement('div');
      badge.className = 'bulletin-preview-badge';
      const stage = document.createElement('div');
      stage.className = 'bulletin-page-stage';
      const controls = document.createElement('div');
      controls.className = 'bulletin-page-controls';
      const prevButton = document.createElement('button');
      prevButton.type = 'button';
      prevButton.className = 'bulletin-page-button';
      const nextButton = document.createElement('button');
      nextButton.type = 'button';
      nextButton.className = 'bulletin-page-button';
      const hint = document.createElement('p');
      hint.className = 'bulletin-page-hint';
      hint.textContent = bulletinText('bulletin.clickHint', 'Click the right side for the next page, or the left side for the previous page.');
      const renderPage = async (pageNumber) => {
        if (viewer.dataset.pdfToken !== token) return;
        view.dataset.page = String(pageNumber);
        badge.textContent = pageCount > 1
          ? formatBulletinText('bulletin.pageStatus', 'Page {page} of {total}', { page: String(pageNumber), total: String(pageCount) })
          : `${bulletinText('bulletin.pageLabel', 'Page')} 1`;
        stage.innerHTML = `<div class="bulletin-paper"><span class="paper-date">PDF</span><h3>${escapeHtml(title)}</h3><p>${escapeHtml(bulletinText('bulletin.loading', 'Preparing bulletin preview.'))}</p></div>`;
        const page = await pdf.getPage(pageNumber);
        const baseViewport = page.getViewport({ scale: 1 });
        const targetWidth = Math.min(900, Math.max(560, viewer.clientWidth * 1.08));
        const viewport = page.getViewport({ scale: targetWidth / baseViewport.width });
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.width = Math.floor(viewport.width);
        canvas.height = Math.floor(viewport.height);
        canvas.className = 'bulletin-canvas';
        canvas.setAttribute('aria-label', `${title} ${bulletinText('bulletin.pageLabel', 'Page')} ${pageNumber}`);
        await page.render({ canvasContext: context, viewport }).promise;
        if (viewer.dataset.pdfToken !== token || view.dataset.page !== String(pageNumber)) return;
        stage.innerHTML = '';
        stage.appendChild(canvas);
        prevButton.disabled = pageNumber <= 1;
        nextButton.disabled = pageNumber >= pageCount;
        prevButton.textContent = bulletinText('bulletin.prevPage', 'Previous page');
        nextButton.textContent = bulletinText('bulletin.nextPage', 'Next page');
      };
      const changePage = (delta) => {
        const current = Number(view.dataset.page || '1');
        const next = Math.min(pageCount, Math.max(1, current + delta));
        if (next !== current) renderPage(next);
      };
      prevButton.addEventListener('click', () => changePage(-1));
      nextButton.addEventListener('click', () => changePage(1));
      stage.addEventListener('click', (event) => {
        const rect = stage.getBoundingClientRect();
        changePage(event.clientX > rect.left + rect.width / 2 ? 1 : -1);
      });
      controls.append(prevButton, nextButton);
      view.append(badge, stage, controls, hint);
      wrap.appendChild(view);
      if (viewer.dataset.pdfToken !== token) return;
      viewer.innerHTML = '';
      viewer.appendChild(wrap);
      await renderPage(1);
      if (downloadHtml) viewer.insertAdjacentHTML('beforeend', downloadHtml);
    } catch (error) {
      if (viewer.dataset.pdfToken !== token) return;
      viewer.innerHTML = `<div class="bulletin-empty"><div class="bulletin-paper"><span class="paper-date">PDF</span><h3>${escapeHtml(title)}</h3><p>${escapeHtml(bulletinText('bulletin.fallback', 'The web preview could not be loaded. Please open the bulletin with the download button below.'))}</p></div></div>`;
      if (downloadHtml) viewer.insertAdjacentHTML('beforeend', downloadHtml);
      console.warn('PDF preview failed', error);
    }
  };

  const renderGallery = () => {
    const feature = document.querySelector('[data-gallery-feature]');
    const thumbs = document.querySelector('[data-gallery-thumbs]');
    if (!feature || !thumbs) return;
    const items = state.gallery.filter((item) => safeUrl(item.url));
    const selected = items[state.selectedPhoto] || items[0];
    if (!selected) return;
    const img = feature.querySelector('img');
    const title = feature.querySelector('[data-gallery-title]');
    const caption = feature.querySelector('[data-gallery-caption]');
    img.src = selected.url;
    img.alt = localized(selected.title, 'KCOC church photo');
    title.textContent = localized(selected.title, 'KCOC');
    caption.textContent = localized(selected.caption, 'KCOC church life');
    thumbs.innerHTML = items.map((item, index) => `
      <button class="gallery-thumb${index === state.selectedPhoto ? ' is-active' : ''}" type="button" data-gallery-index="${index}" aria-pressed="${index === state.selectedPhoto ? 'true' : 'false'}">
        <img src="${safeUrl(item.url)}" alt="${escapeAttr(localized(item.title, 'KCOC church photo'))}" loading="lazy" decoding="async">
        <span class="gallery-thumb-label">${escapeHtml(localized(item.title, 'KCOC'))}</span>
      </button>`).join('');
    thumbs.querySelectorAll('[data-gallery-index]').forEach((button) => button.addEventListener('click', () => {
      state.selectedPhoto = Number(button.dataset.galleryIndex) || 0;
      renderGallery();
    }));
  };

  const renderBulletins = () => {
    const list = document.querySelector('[data-bulletin-list]');
    const viewer = document.querySelector('[data-bulletin-viewer]');
    if (!list || !viewer) return;
    const items = state.bulletins;
    const selected = items[state.selectedBulletin] || items[0];
    list.innerHTML = items.map((item, index) => `
      <button class="bulletin-item" type="button" data-bulletin-index="${index}" aria-pressed="${index === state.selectedBulletin ? 'true' : 'false'}">
        <span>${escapeHtml(item.date || '')}</span>
        <strong>${escapeHtml(localized(item.title, 'Church Bulletin'))}</strong>
      </button>`).join('');
    list.querySelectorAll('[data-bulletin-index]').forEach((button) => button.addEventListener('click', () => {
      state.selectedBulletin = Number(button.dataset.bulletinIndex) || 0;
      renderBulletins();
    }));
    if (!selected) return;
    const url = safeUrl(selected.url || selected.downloadUrl);
    const download = safeUrl(selected.downloadUrl || selected.url);
    const proxiedPdfUrl = url && (selected.mime || '').includes('pdf')
      ? `${window.location.origin}/api/bulletins/view?src=${encodeURIComponent(url)}`
      : '';
    const downloadHref = download ? (proxiedPdfUrl ? `${proxiedPdfUrl}&download=1` : download) : '';
    const downloadHtml = downloadHref
      ? `<div class="bulletin-actions bulletin-download-bar" style="padding:0 22px 22px"><a class="btn btn-dark" href="${downloadHref}" rel="noopener" download>${escapeHtml(translations[state.lang]?.text['bulletin.download'] || 'Download bulletin')}</a></div>`
      : '';
    if (url && (selected.mime || '').includes('pdf')) {
      renderPdfPreview(viewer, proxiedPdfUrl, localized(selected.title, 'Church Bulletin'), downloadHtml);
    } else if (url) {
      viewer.innerHTML = `<img class="bulletin-image" src="${url}" alt="${escapeAttr(localized(selected.title, 'Church Bulletin'))}" loading="lazy" decoding="async">`;
    } else {
      viewer.innerHTML = `<div class="bulletin-empty"><div class="bulletin-paper"><span class="paper-date">${escapeHtml(selected.date || 'Bulletin')}</span><h3>${escapeHtml(localized(selected.title, 'Church Bulletin'))}</h3><p>${escapeHtml(localized(selected.summary, translations[state.lang]?.text['bulletin.emptyText'] || 'Upload a bulletin to view it here.'))}</p><div class="bulletin-actions"><a class="btn btn-dark" href="admin/">주보 업로드 준비</a></div></div></div>`;
    }
    if (download && !proxiedPdfUrl) {
      const existing = viewer.querySelector('.bulletin-download-bar');
      if (!existing) viewer.insertAdjacentHTML('beforeend', downloadHtml);
    }
  };

  const escapeHtml = (value) => String(value ?? '').replace(/[&<>"]/g, (ch) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[ch]));
  const escapeAttr = escapeHtml;

  const loadPublicContent = async () => {
    try {
      const [galleryRes, bulletinRes] = await Promise.allSettled([
        fetch('/api/media/gallery', { headers: { accept: 'application/json' } }),
        fetch('/api/bulletins', { headers: { accept: 'application/json' } })
      ]);
      if (galleryRes.status === 'fulfilled' && galleryRes.value.ok) {
        const data = await galleryRes.value.json();
        if (Array.isArray(data.items) && data.items.length) state.gallery = data.items;
      }
      if (bulletinRes.status === 'fulfilled' && bulletinRes.value.ok) {
        const data = await bulletinRes.value.json();
        if (Array.isArray(data.items) && data.items.length) state.bulletins = data.items;
      }
    } catch (_) {}
    renderGallery();
    renderBulletins();
  };

  function setLang(lang) {
    const pack = translations[lang] || translations.ko;
    state.lang = translations[lang] ? lang : 'ko';
    document.documentElement.lang = lang === 'zh' ? 'zh-Hans' : lang;
    document.documentElement.dir = pack.dir || 'ltr';
    document.title = pack.title;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', pack.description);

    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const value = pack.text[el.dataset.i18n] ?? translations.ko.text[el.dataset.i18n];
      if (value == null) return;
      if (value.includes('<br>')) el.innerHTML = value;
      else el.textContent = value;
    });

    buttons.forEach((button) => {
      const active = button.dataset.lang === lang;
      button.classList.toggle('is-active', active);
      button.setAttribute('aria-pressed', active ? 'true' : 'false');
    });

    renderGallery();
    renderBulletins();
    try { localStorage.setItem('kcoc-lang', lang); } catch (_) {}
  }

  buttons.forEach((button) => button.addEventListener('click', () => setLang(button.dataset.lang)));
  let saved = 'ko';
  try { saved = localStorage.getItem('kcoc-lang') || 'ko'; } catch (_) {}
  setLang(translations[saved] ? saved : 'ko');
  loadPublicContent();
})();
