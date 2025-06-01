let nodeCrypto;
if (typeof window === 'undefined') {
  nodeCrypto = require('crypto');
}

async function generateAnonymousID(company, username, password) {
  const input = `${company}_${username}_${password}`;
  await hashData(input); // compute hash for parity with browser version
  const companyPrefix = (company.slice(0, 3) || 'UNK').toUpperCase();
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  return `${companyPrefix}_${randomNum}`;
}

async function hashPassword(password) {
  return hashData(password);
}

async function hashData(data) {
  if (typeof window !== 'undefined' && window.crypto && window.crypto.subtle) {
    const encoder = new TextEncoder();
    const msgBuffer = encoder.encode(data);
    const hashBuffer = await window.crypto.subtle.digest('SHA-256', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  }
  if (nodeCrypto) {
    return nodeCrypto.createHash('sha256').update(data).digest('hex');
  }
  throw new Error('Crypto API unavailable');
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { generateAnonymousID, hashPassword };
}

if (typeof window !== 'undefined') {
  window.generateAnonymousID = generateAnonymousID;
  window.hashPassword = hashPassword;
}
