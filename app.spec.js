const request = require('supertest');
const app = require('./app.js');

describe('api', () => {
  let cards;

  beforeEach(() => {
    cards = [
      {id: 1, name: 'Grocery List', list: [1, 2]},
      {id: 2, name: 'Chores List', list: [3, 4]}
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

  describe('GET /api/v1/cards/:id', () => {
    describe('Happy GET', () => {
      it('should return a 200 and the matching card', async () => {
        const response = await request(app).get('/api/v1/cards/1');
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(cards[0]);
      });
    });

    describe('Sad GET', () => {
      it('should return a 404 and an error message if card doesn\'t exist', async () => {
        const response = await request(app).get('/api/v1/cards/5');
        expect(response.statusCode).toBe(404);
        expect(response.body).toEqual(`Card with id of 5 does not exist`);
      });
    });
  });

  describe('POST /api/v1/cards', () => {
    let newCard;

    beforeEach(async () => {
      newCard = {name: 'Pets'};
    });

    describe('Happy POST', () => {
      it('should return a 201 and an array of cards', async () => {
        const response = await request(app).post('/api/v1/cards').send(newCard);
        expect(response.statusCode).toBe(201);
      });

      it('should return the new card with an id', async () => {
        const response = await request(app).post('/api/v1/cards').send(newCard);
        console.log(response.body);
        expect(response.body.id).toBeDefined();
      });
    });

    describe('Sad POST', () => {

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

  describe('PUT /api/v1/cards/:id', () => {
    describe('Happy PUT', () => {
      it('should return a 204 if card successfully updated', async () => {
        const newCardInfo = { name: 'Grocery List', list: ['item1', 'item2'] };
        const response = await request(app).put('/api/v1/cards/1').send(newCardInfo);
        expect(response.status).toBe(204);
      });

      it('should update the target card if successful', async () => {
        const newCardInfo = { name: 'Grocery List', list: ['item1', 'item2'] };
        const expected = [{id: 1, ...newCardInfo}, cards[1]];
        expect(app.locals.cards).toEqual(cards)
        const response = await request(app).put('/api/v1/cards/1').send(newCardInfo);
        expect(app.locals.cards).toEqual(expected)
      });
    });

    describe('Sad PUT', () => {
      it('should return a 422 and an error message if there is no list', async () => {
        const cardWithNoList = { name: 'Pets', list: [] };
        const response = await request(app).put('/api/v1/cards/1').send(cardWithNoList);
        expect(response.status).toBe(422);
        expect(response.body).toBe('You must have at least 1 list item before you can save this card');
      });

      it('should return a 422 and an error message if there is no name', async () => {
        const cardWithNoName = { name: '', list: [1,2] };
        const response = await request(app).put('/api/v1/cards/1').send(cardWithNoName);
        expect(response.status).toBe(422);
        expect(response.body).toBe('Your card must have a name');
      });

      it('should return a 404 and an error message if the card does not exist', async () => {
        const newCardInfo = { name: 'Grocery List', list: ['item1', 'item2'] };
        const response = await request(app).put('/api/v1/cards/5').send(newCardInfo);
        expect(response.status).toBe(404);
        expect(response.body).toBe(`Cannot update: Card not found at the id of 5`);
      });
    });
  });

  describe('DELETE /api/v1/cards/:id', () => {
    describe('Happy DELETE', () => {
      it('should return a 204 if card successfully deleted', async () => {
        const response = await request(app).delete('/api/v1/cards/1');
        expect(response.status).toBe(204);
      });

      it('should delete the card if it exists', async () => {
        const expected = [cards[1]]
        expect(app.locals.cards.length).toBe(2);
        await request(app).delete('/api/v1/cards/1');
        expect(app.locals.cards.length).toBe(1);
        expect(app.locals.cards).toEqual(expected)
      });
    });

    describe('Sad DELETE', () => {
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