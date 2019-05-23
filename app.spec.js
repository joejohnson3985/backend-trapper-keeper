const request = require('supertest');
const app = require('./app.js');

describe('api', () => {
  describe('GET /api/v1/cards', () => {
    it('should return a 200', async () => {
      const response = await request(app).get('/api/v1/cards');
      expect(response.statusCode).toBe(200);
    });
  });
});