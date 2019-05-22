const express = require('express');
const app = express();

app.set('port', process.env.PORT || 3000);

app.locals.title = 'Trapper Keeper'
app.use(express.json());



app.listen(app.get('port'), () => {
    console.log(`${app.locals.title} is running http://localhost:${app.get('port')}`)
})