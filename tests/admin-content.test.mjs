import test from 'node:test';
import assert from 'node:assert/strict';
import { applyAutoTranslations } from '../site/v1/functions/api/admin/content.js';

test('applyAutoTranslations translates Korean hero copy into English Chinese and Spanish on save', async () => {
  const calls = [];
  const payload = {
    hero: {
      title: { ko: '예수님의 사랑으로 환영합니다', en: 'old english should be replaced' },
      lead: { ko: '말씀과 성령 안에서 함께 예배합니다.' }
    },
    services: { korean: '11:00 AM' }
  };

  const translated = await applyAutoTranslations(payload, {
    translator: async ({ text, target }) => {
      calls.push({ text, target });
      return `${target}:${text}`;
    }
  });

  assert.equal(translated.hero.title.ko, '예수님의 사랑으로 환영합니다');
  assert.equal(translated.hero.title.en, 'en:예수님의 사랑으로 환영합니다');
  assert.equal(translated.hero.title.zh, 'zh:예수님의 사랑으로 환영합니다');
  assert.equal(translated.hero.title.es, 'es:예수님의 사랑으로 환영합니다');
  assert.equal(translated.hero.lead.en, 'en:말씀과 성령 안에서 함께 예배합니다.');
  assert.equal(translated.hero.lead.zh, 'zh:말씀과 성령 안에서 함께 예배합니다.');
  assert.equal(translated.hero.lead.es, 'es:말씀과 성령 안에서 함께 예배합니다.');
  assert.equal(translated.translation.source, 'ko');
  assert.equal(translated.translation.provider, 'openai');
  assert.ok(translated.translation.updatedAt);
  assert.deepEqual(calls.map((call) => call.target), ['en', 'zh', 'es', 'en', 'zh', 'es']);
});

test('applyAutoTranslations keeps non-localized fields unchanged and skips blank Korean text', async () => {
  const payload = {
    hero: { title: { ko: '' }, lead: { ko: '   ' } },
    contact: { email: 'help@mykoreanchurch.org' }
  };

  const translated = await applyAutoTranslations(payload, {
    translator: async () => {
      throw new Error('translator should not be called for blank text');
    }
  });

  assert.equal(translated.contact.email, 'help@mykoreanchurch.org');
  assert.equal(translated.hero.title.ko, '');
  assert.equal(translated.hero.title.en, '');
  assert.equal(translated.hero.lead.es, '');
});
