import request from 'supertest';
import '@babel/polyfill';
import app from './app';

describe('api', () => {
  describe('GET /api/v1/cards', () => {
    it('should return a 200', async () => {
      const response = await request(app).get('/api/v1/cards');
      expect(response.statusCode).toBe(200);
    });
  });
});