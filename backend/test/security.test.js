const test = require('node:test');
const assert = require('node:assert/strict');
const errorMiddleware = require('../middleware/errorMiddleware');

test('errorMiddleware hides stack traces and returns a consistent API payload', () => {
  const originalEnv = process.env.NODE_ENV;
  process.env.NODE_ENV = 'production';

  const req = {};
  const res = {
    statusCode: 200,
    status(code) {
      this.statusCode = code;
      return this;
    },
    json(payload) {
      this.payload = payload;
    }
  };

  errorMiddleware(new Error('Sensitive failure'), req, res, () => {});

  assert.equal(res.statusCode, 500);
  assert.deepEqual(res.payload, {
    success: false,
    message: 'Sensitive failure',
    code: 'INTERNAL_SERVER_ERROR'
  });

  process.env.NODE_ENV = originalEnv;
});
