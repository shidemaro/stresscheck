const { generateAnonymousID, hashPassword } = require('../utils');

test('generateAnonymousID returns prefix and digits', async () => {
  const id = await generateAnonymousID('ABC', 'user', 'pass');
  expect(id).toMatch(/^ABC_\d{4}$/);
});

test('hashPassword is deterministic', async () => {
  const first = await hashPassword('secret');
  const second = await hashPassword('secret');
  expect(first).toBe(second);
});
