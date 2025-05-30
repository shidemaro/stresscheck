const crypto = require('crypto');

async function generateAnonymousID(company, username, password) {
  const input = `${company}_${username}_${password}`;
  // Hashing for compatibility with browser version, though not used in ID
  crypto.createHash('sha256').update(input).digest('hex');
  const companyPrefix = (company.slice(0, 3) || 'UNK').toUpperCase();
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  return `${companyPrefix}_${randomNum}`;
}

async function hashPassword(password) {
  return crypto.createHash('sha256').update(password).digest('hex');
}

module.exports = { generateAnonymousID, hashPassword };
