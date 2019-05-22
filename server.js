// import cors from 'cors';

let cors = require('cors')


const express = require('express');
const app = express();

app.use(cors());
app.set('port', process.env.PORT || 3000);

app.locals.title = 'Trapper Keeper'
app.locals.cards = [
    {id: 1, name: 'Grocery List', list: [
        {list_id: 'a1', body: 'Soda Pop'},
        {list_id: 'a2', body: 'Candy Canes'}
    ]
    },
    {id: 2, name: 'Chores List', list: [
        {list_id: 'b1', body: 'Do the dishes'}
    ] 
    }
]

app.use(express.json());

app.get('/api/v1/cards', (request, response) => {
    return response.status(200).json(app.locals.cards)
});



app.listen(app.get('port'), () => {
    console.log(`${app.locals.title} is running http://localhost:${app.get('port')}`)
});