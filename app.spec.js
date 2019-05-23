const request = require('supertest');
const app = require('./app.js');

describe('api', () => {
  let cards;

  beforeEach(() => {
    cards = [
      {id: 1, name: 'Grocery List'},
      {id: 2, name: 'Chores List'}
    ];
    app.locals.cards = cards;
  });

  describe('GET /api/v1/cards', () => {

    it('should return a 200 and an array of cards', async () => {
      const response = await request(app).get('/api/v1/cards');
      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual(cards);
    });
  });

  describe('POST /api/v1/cards', () => {
    let newCard;

    beforeEach(async () => {
      newCard = {name: 'Pets'};
    });

    describe('Happy', () => {
      it('should return a 201 and an array of cards', async () => {
        const response = await request(app).post('/api/v1/cards').send(newCard);
        expect(response.statusCode).toBe(201);
      });

      it('should return the new card with an id', async () => {
        Date.now = jest.fn().mockImplementation(() => 10);
        const response = await request(app).post('/api/v1/cards').send(newCard);
        expect(response.body).toEqual({id: 10, ...newCard});
      });
    });

    describe('Sad', () => {

      beforeEach(() => {
        newCard.name = '';
      });
      it('should return a 422 if name property does not exist', async () => {
        const response = await request(app).post('/api/v1/cards').send(newCard);
        expect(response.status).toBe(422);
      });

      it('should return a no name message if no name property', async () => {
        const response = await request(app).post('/api/v1/cards').send(newCard);
        expect(response.body).toBe('Please name your card');
      });
    });
  })

  describe('DELETE /api/v1/cards/:id', () => {
    describe('Happy', () => {
      it('should return a 204 if card successfully deleted', async () => {
        const response = await request(app).delete('/api/v1/cards/1');
        expect(response.status).toBe(204);
      });

      it('should delete the card if it exists', async () => {
        expect(app.locals.cards.length).toBe(2);
        await request(app).delete('/api/v1/cards/1');
        expect(app.locals.cards.length).toBe(1);
        expect(app.locals.cards).toEqual([{id: 2, name: 'Chores List'}])
      });
    });

    describe('Sad', () => {
      it('should return a 404 if card does not exist', async () => {
        const response = await request(app).delete('/api/v1/cards/5');
        expect(response.status).toBe(404);
      });

      it('should return a no card message if the card doesn\'t exist', async () => {
        const response = await request(app).delete('/api/v1/cards/5');
        expect(response.body).toBe('Card not found');
      });
    });
  });
});