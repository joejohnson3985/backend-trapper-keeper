// import cors from 'cors';

let cors = require('cors')


const express = require('express');
const app = express();

app.use(cors());
app.use(express.json());
app.set('port', process.env.PORT || 3000);

app.locals.title = 'Trapper Keeper'
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



app.listen(app.get('port'), () => {
    console.log(`${app.locals.title} is running http://localhost:${app.get('port')}`)
});