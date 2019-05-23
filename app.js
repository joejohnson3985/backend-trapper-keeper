import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

app.locals.title = 'Trapper Keeper';

app.locals.cards = [
    {id: 1, name: 'Grocery List'},
    {id: 2, name: 'Chores List'}
]

app.locals.listItems = [
    {list_id: 123123, card_id: 1, item: 'Soda pop'},
    {list_id: 243432, card_id: 2, item: 'Do the dishes'}
]

app.get('/api/v1/cards', (request, response) => {
    return response.status(200).json(app.locals.cards)
});

app.get('/api/v1/cards/listitems', (req, res) => {
    return res.status(200).json(app.locals.listItems)
});

app.post('/api/v1/cards', (req, res) => {
    const { name, list } = req.body;
    if(!name) return res.status(422).json('Please name your card')
    const newCard = {
        id: Date.now(),
        ...req.body
    };
    app.locals.cards = [...app.locals.cards, newCard]
    res.status(201).json(newCard)
});

app.post('/api/v1/cards/listitems', (req, res) => {
    const { name, list } = req.body;
    if(!name) return res.status(422).json('Please name your card')
    const newItem = {
        list_id: Date.now(),
        ...req.body
    };
    app.locals.cards = [...app.locals.listItems, newItem]
    res.status(201).json(newItem)
});

app.delete('/api/v1/cards/:id', (req , res) => {
    const cardIndex = app.locals.cards.findIndex( card => card.id === req.params.id);
    if(cardIndex === -1) return res.status(404).json('Card not found');
    app.locals.cards.splice(cardIndex, 1)
    return res.sendStatus(204)
});

app.delete('/api/v1/cards/listitems/:id', (req, res) => {
    const listIndex = app.locals.listItems.findIndex( item => item.list_id === req.params.id)
    if(listIndex === -1) return res.status(404).json('List Item not found');
    app.locals.cards.splice(listIndex, 1)
    return res.sendStatus(204)
});

export default app;