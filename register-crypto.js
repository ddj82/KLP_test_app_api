// register-crypto.js
const c = require('crypto');

// 1) globalThis.crypto가 없으면 채워 넣기(가능하면 webcrypto로)
if (!globalThis.crypto) {
  globalThis.crypto = c.webcrypto || {};
}

// 2) randomUUID가 없으면 제공
if (typeof globalThis.crypto.randomUUID !== 'function') {
  if (typeof c.randomUUID === 'function') {
    // Node 16 일부 버전에 있는 crypto.randomUUID를 그대로 연결
    globalThis.crypto.randomUUID = c.randomUUID;
  } else {
    // 최후 수단: randomBytes로 UUID v4 생성
    const { randomBytes } = c;
    globalThis.crypto.randomUUID = () => {
      const b = randomBytes(16);
      b[6] = (b[6] & 0x0f) | 0x40; // version 4
      b[8] = (b[8] & 0x3f) | 0x80; // variant
      const s = [...b].map((x) => x.toString(16).padStart(2, '0')).join('');
      return `${s.slice(0, 8)}-${s.slice(8, 12)}-${s.slice(12, 16)}-${s.slice(16, 20)}-${s.slice(20)}`;
    };
  }
}
