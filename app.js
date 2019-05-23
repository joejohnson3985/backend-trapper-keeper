const express = require('express');
const cors = require('cors');
const uuidv1 = require('uuid/v1')

const app = express();
app.use(cors());
app.use(express.json());

app.locals.cards = [
  {id: 1, name: 'Grocery List',  list: 
    [
      {list_id: 123123, item: 'Pop'},
      {list_id: 321312, item: 'Coke'},
      {list_id: 231312, item: 'Soda'}
    ]
  },
  {id: 2, name: 'Chores List', list: 
    [
      {list_id: 243432, item: 'Do the dishes'}
    ]
  }
]

app.get('/api/v1/cards', (request, response) => {
  return response.status(200).json(app.locals.cards);
});

app.post('/api/v1/cards', (req, res) => {
  const { name, list } = req.body;
  if(!name) return res.status(422).json('Please name your card');
  const newCard = {
      id: uuidv1(),
      ...req.body
  };
  app.locals.cards = [...app.locals.cards, newCard];
  res.status(201).json(newCard);
});

app.put('/api/v1/cards/:id', (req, res) => {
  const { name, list } = req.body;
  if (!name) return res.status(422).json('Your card must have a name');
  if (!list.length) return res.status(422).json('You must have at least 1 list item before you can save this card');
  const id = req.params.id;
  const targetCardIndex = app.locals.cards.findIndex(card => card.id === id);
  if (targetCardIndex === -1) return res.status(404).json('Cannot update: Card not found');
  const updatedCard = {id, ...req.body};
  app.locals.cards.splice(targetCardIndex, 1, updatedCard);
  res.status(200).json(updatedCard);
});


app.delete('/api/v1/cards/:id', (req , res) => {
  const cardIndex = app.locals.cards.findIndex( card => card.id == req.params.id);
  if(cardIndex === -1) return res.status(404).json('Card not found');
  app.locals.cards.splice(cardIndex, 1);
  return res.sendStatus(204);
});

module.exports = app;