(() => {
  const html = document.documentElement;
  const buttons = Array.from(document.querySelectorAll('[data-lang]'));
  const defaultText = new Map();
  const defaultHtml = new Map();

  document.querySelectorAll('[data-i18n]').forEach((el) => defaultText.set(el, el.textContent));
  document.querySelectorAll('[data-i18n-html]').forEach((el) => defaultHtml.set(el, el.innerHTML));

  const dict = {
    ko: {
      label: '한국어',
      key: {
        'nav.visit': '처음 오셨나요',
        'nav.worship': '예배와 말씀',
        'nav.media': '미디어',
        'nav.nextgen': '다음세대',
        'nav.mission': '공동체와 선교',
        'nav.news': '소식',
        'nav.school': '한글학교',
        'nav.contact': '오시는 길',
        'hero.title': '한 영혼과 열방과 다음 세대를 살리는 교회',
        'hero.lead': '콜럼버스 한인교회에 오신 여러분을 주님의 이름으로 환영합니다. 함께 예배하고, 말씀 안에서 자라며, 다음 세대와 열방을 섬기는 믿음의 공동체입니다.',
        'hero.sub': 'Welcome to Korean Church of Columbus. Worship with us, grow in God’s Word, and walk the journey of faith together.',
        'cta.worship': '예배 시간 보기',
        'cta.visit': '처음 방문 안내',
        'cta.directions': '오시는 길',
        'media.kicker': 'Media & Worship',
        'media.title': '예배와 공동체를 영상과 사진으로 만나다',
        'media.intro': '기존 홈페이지의 사진과 공식 YouTube 채널을 연결해 예배, 말씀, 공동체의 현장을 더 생생하게 보여드립니다.',
        'media.channel': 'YouTube 채널 보기',
        'media.photoTitle': '함께 예배하고 함께 자라는 공동체',
        'media.photoText': '예배, 다음세대, 성도들의 교제를 사진으로 소개합니다.',
        'media.videoTitle': '수요예배 말씀 다시보기',
        'media.videoText': '공식 YouTube 재생목록을 통해 최근 말씀과 예배 영상을 이어서 볼 수 있습니다.',
        'media.playlist': '재생목록 열기',
        'media.channelShort': '채널 방문'
      },
      text: {}
    },
    en: {
      label: 'English',
      key: {
        'nav.visit': 'New Here',
        'nav.worship': 'Worship & Word',
        'nav.media': 'Media',
        'nav.nextgen': 'Next Generation',
        'nav.mission': 'Community & Mission',
        'nav.news': 'News',
        'nav.school': 'Korean School',
        'nav.contact': 'Visit Us',
        'hero.title': 'A church that gives life to one soul, the nations, and the next generation',
        'hero.lead': 'Welcome to Korean Church of Columbus. We worship together, grow in God’s Word, and serve the next generation and the nations as a family of faith.',
        'hero.sub': 'You are welcome here. Join us for worship, community, and the journey of faith.',
        'cta.worship': 'See worship times',
        'cta.visit': 'Plan your visit',
        'cta.directions': 'Get directions',
        'media.kicker': 'Media & Worship',
        'media.title': 'Experience worship and community through video and photos',
        'media.intro': 'Photos from the existing church site and the official YouTube channel help visitors see worship, sermons, and church life more vividly.',
        'media.channel': 'View YouTube channel',
        'media.photoTitle': 'A community worshiping and growing together',
        'media.photoText': 'Explore worship, next generation ministries, and fellowship through photos.',
        'media.videoTitle': 'Watch Wednesday worship sermons',
        'media.videoText': 'Continue watching recent sermons and worship videos through the official YouTube playlist.',
        'media.playlist': 'Open playlist',
        'media.channelShort': 'Visit channel'
      },
      text: {
        '주일 장년 예배': 'Sunday Korean Worship',
        '1부 오전 9시 · 2부 오전 11시': '1st service 9:00 AM · 2nd service 11:00 AM',
        'Sunday English Worship': 'Sunday English Worship',
        '1st 9:00 AM · 2nd 11:00 AM': '1st 9:00 AM · 2nd 11:00 AM',
        '주중 예배와 기도': 'Midweek Worship & Prayer',
        '수요예배 오후 7시 · 새벽기도 매일 오전 6시': 'Wednesday 7:00 PM · Daily dawn prayer 6:00 AM',
        '교회학교': 'Sunday School',
        '주일 오전 11시 · 자녀 예배와 교육': 'Sunday 11:00 AM · Children’s worship and education',
        '예배와 말씀': 'Worship & Word',
        '주보에 공개된 예배와 성경공부 시간을 방문자가 바로 확인할 수 있도록 정리했습니다.': 'Worship and Bible study times from the bulletin are organized for quick access.',
        '교회 위치 보기': 'See church location',
        '주일 영어 예배': 'Sunday English Worship',
        '수요예배 오후 7시': 'Wednesday 7:00 PM',
        '새벽기도 매일 오전 6시': 'Daily dawn prayer 6:00 AM',
        '처음 오신 분도 편안하게': 'Feel at home on your first visit',
        '교회를 처음 방문하는 분들이 예배 전부터 예배 후까지 무엇을 기대하면 되는지 쉽게 알 수 있도록 안내합니다.': 'Clear guidance helps first-time guests know what to expect before, during, and after worship.',
        '방문 전 문의하기': 'Contact before visiting',
        '위치 확인하기': 'Check location',
        '편안한 복장으로 오셔도 좋습니다.': 'Come as you are in comfortable clothing.',
        '주차와 입구 안내를 쉽게 찾을 수 있도록 정리합니다.': 'Parking and entrance guidance is easy to find.',
        '자녀와 함께 오시는 가정을 위해 주일학교와 Youth 안내를 제공합니다.': 'Sunday School and Youth information is available for families with children.',
        '예배 후 새가족 안내와 문의 연결을 도와드립니다.': 'We help connect newcomers after worship.',
        '다음세대와 교육': 'Next Generation & Education',
        '교회 비전': 'Church Vision',
        '한 영혼과 열방과 다음 세대를 살리는 교회': 'A church that gives life to one soul, the nations, and the next generation',
        '주보와 교회소식': 'Bulletin & Church News',
        '최근 안내': 'Latest Updates',
        '섬기는 사람들': 'Serving Staff',
        '오시는 길': 'Visit Us',
        '구글 지도에서 길찾기': 'Get directions on Google Maps',
        '콜럼버스 한인교회 공식 웹사이트': 'Official website of Korean Church of Columbus'
      }
    },
    zh: {
      label: '中文',
      key: {
        'nav.visit': '首次来访',
        'nav.worship': '礼拜与 말씀',
        'nav.media': '媒体',
        'nav.nextgen': '下一代',
        'nav.mission': '团契与宣教',
        'nav.news': '消息',
        'nav.school': '韩文学校',
        'nav.contact': '地址',
        'hero.title': '使一个灵魂、万民与下一代得生命的教会',
        'hero.lead': '欢迎来到哥伦布韩人教会。我们一起敬拜，在神的话语中成长，并服事下一代与万民。',
        'hero.sub': '欢迎您加入我们的敬拜、团契和信仰旅程。',
        'cta.worship': '查看礼拜时间',
        'cta.visit': '首次来访指南',
        'cta.directions': '查看地址',
        'media.kicker': '媒体与敬拜',
        'media.title': '通过视频和照片认识敬拜与团契',
        'media.intro': '连接原网站照片和官方 YouTube 频道，更生动地展示敬拜、信息和教会生活。',
        'media.channel': '查看 YouTube 频道',
        'media.photoTitle': '一起敬拜、一起成长的共同体',
        'media.photoText': '通过照片认识敬拜、下一代事工和团契。',
        'media.videoTitle': '观看周三礼拜信息',
        'media.videoText': '通过官方 YouTube 播放列表观看最近的信息和礼拜视频。',
        'media.playlist': '打开播放列表',
        'media.channelShort': '访问频道'
      },
      text: {
        '주일 장년 예배': '主日成人礼拜',
        '1부 오전 9시 · 2부 오전 11시': '第一堂 上午9点 · 第二堂 上午11点',
        'Sunday English Worship': '主日英语礼拜',
        '1st 9:00 AM · 2nd 11:00 AM': '第一堂 9:00 AM · 第二堂 11:00 AM',
        '주중 예배와 기도': '周中礼拜与祷告',
        '수요예배 오후 7시 · 새벽기도 매일 오전 6시': '周三晚7点 · 每日晨祷早6点',
        '교회학교': '主日学校',
        '주일 오전 11시 · 자녀 예배와 교육': '主日上午11点 · 儿童礼拜与教育',
        '예배와 말씀': '礼拜与 말씀',
        '교회 위치 보기': '查看教会地址',
        '처음 오신 분도 편안하게': '首次来访也能安心',
        '방문 전 문의하기': '来访前咨询',
        '위치 확인하기': '查看位置',
        '다음세대와 교육': '下一代与教育',
        '교회 비전': '教会异象',
        '주보와 교회소식': '周报与教会消息',
        '최근 안내': '最新消息',
        '섬기는 사람들': '服事同工',
        '오시는 길': '地址',
        '구글 지도에서 길찾기': '在 Google 地图中导航',
        '콜럼버스 한인교회 공식 웹사이트': '哥伦布韩人教会官方网站'
      }
    },
    es: {
      label: 'Español',
      key: {
        'nav.visit': 'Primera visita',
        'nav.worship': 'Culto y Palabra',
        'nav.media': 'Media',
        'nav.nextgen': 'Próxima generación',
        'nav.mission': 'Comunidad y misión',
        'nav.news': 'Noticias',
        'nav.school': 'Escuela coreana',
        'nav.contact': 'Visítanos',
        'hero.title': 'Una iglesia que da vida a un alma, a las naciones y a la próxima generación',
        'hero.lead': 'Bienvenidos a Korean Church of Columbus. Adoramos juntos, crecemos en la Palabra de Dios y servimos a la próxima generación y a las naciones.',
        'hero.sub': 'Eres bienvenido. Acompáñanos en la adoración, la comunidad y el camino de fe.',
        'cta.worship': 'Ver horarios',
        'cta.visit': 'Guía para visitantes',
        'cta.directions': 'Cómo llegar',
        'media.kicker': 'Media y adoración',
        'media.title': 'Conoce la adoración y la comunidad por video y fotos',
        'media.intro': 'Fotos del sitio anterior y el canal oficial de YouTube muestran de forma viva la adoración, los mensajes y la vida de la iglesia.',
        'media.channel': 'Ver canal de YouTube',
        'media.photoTitle': 'Una comunidad que adora y crece junta',
        'media.photoText': 'Conoce la adoración, los ministerios de próxima generación y la comunión por medio de fotos.',
        'media.videoTitle': 'Ver mensajes del culto de miércoles',
        'media.videoText': 'Mira mensajes y videos recientes a través de la lista oficial de YouTube.',
        'media.playlist': 'Abrir lista',
        'media.channelShort': 'Visitar canal'
      },
      text: {
        '주일 장년 예배': 'Culto dominical en coreano',
        '1부 오전 9시 · 2부 오전 11시': '1er culto 9:00 AM · 2º culto 11:00 AM',
        'Sunday English Worship': 'Culto dominical en inglés',
        '1st 9:00 AM · 2nd 11:00 AM': '1º 9:00 AM · 2º 11:00 AM',
        '주중 예배와 기도': 'Culto entre semana y oración',
        '수요예배 오후 7시 · 새벽기도 매일 오전 6시': 'Miércoles 7:00 PM · Oración diaria 6:00 AM',
        '교회학교': 'Escuela dominical',
        '주일 오전 11시 · 자녀 예배와 교육': 'Domingo 11:00 AM · Culto y educación infantil',
        '예배와 말씀': 'Culto y Palabra',
        '교회 위치 보기': 'Ver ubicación',
        '처음 오신 분도 편안하게': 'Si es tu primera visita, siéntete en casa',
        '방문 전 문의하기': 'Contactar antes de visitar',
        '위치 확인하기': 'Ver ubicación',
        '다음세대와 교육': 'Próxima generación y educación',
        '교회 비전': 'Visión de la iglesia',
        '주보와 교회소식': 'Boletín y noticias',
        '최근 안내': 'Últimas noticias',
        '섬기는 사람들': 'Equipo de servicio',
        '오시는 길': 'Visítanos',
        '구글 지도에서 길찾기': 'Cómo llegar en Google Maps',
        '콜럼버스 한인교회 공식 웹사이트': 'Sitio oficial de Korean Church of Columbus'
      }
    }
  };

  const koOriginals = new Map();
  const textNodes = [];
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      if (!node.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
      const parent = node.parentElement;
      if (!parent || ['SCRIPT', 'STYLE'].includes(parent.tagName)) return NodeFilter.FILTER_REJECT;
      return NodeFilter.FILTER_ACCEPT;
    }
  });
  while (walker.nextNode()) {
    const node = walker.currentNode;
    koOriginals.set(node, node.nodeValue);
    textNodes.push(node);
  }

  function applyLang(lang) {
    const current = dict[lang] || dict.ko;
    html.lang = lang === 'zh' ? 'zh-Hans' : lang;
    document.title = lang === 'ko'
      ? 'KCOC — Korean Church of Columbus | 콜럼버스 한인교회'
      : 'KCOC — Korean Church of Columbus';

    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.dataset.i18n;
      el.textContent = current.key[key] || dict.ko.key[key] || defaultText.get(el) || el.textContent;
    });
    document.querySelectorAll('[data-i18n-html]').forEach((el) => {
      const key = el.dataset.i18nHtml;
      el.innerHTML = current.key[key] || dict.ko.key[key] || defaultHtml.get(el) || el.innerHTML;
    });

    textNodes.forEach((node) => {
      const original = koOriginals.get(node);
      const trimmed = original.trim();
      if (!trimmed) return;
      if (lang === 'ko') {
        node.nodeValue = original;
        return;
      }
      const replacement = current.text[trimmed];
      if (replacement) node.nodeValue = original.replace(trimmed, replacement);
      else node.nodeValue = original;
    });

    buttons.forEach((btn) => {
      const active = btn.dataset.lang === lang;
      btn.classList.toggle('is-active', active);
      btn.setAttribute('aria-pressed', active ? 'true' : 'false');
    });
    try { localStorage.setItem('kcoc-lang', lang); } catch (_) {}
  }

  buttons.forEach((btn) => btn.addEventListener('click', () => applyLang(btn.dataset.lang)));
  const saved = (() => { try { return localStorage.getItem('kcoc-lang'); } catch (_) { return null; } })();
  applyLang(saved && dict[saved] ? saved : 'ko');
})();
