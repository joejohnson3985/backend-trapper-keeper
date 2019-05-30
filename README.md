# Backend for Trapper Keeper

This is a backend meant to manage the data users submit on [Trapper Keeper](https://github.com/joejohnson3985/trapperkeeper)

# Install
To use this backend clone down this repo and move into it.

```git clone https://github.com/joejohnson3985/backend-trapper-keeper.git```

```cd backend-trapper-keeper```

In the project directory you will need to instal dependencies and start the server, please run:

```npm install```

```npm start```

Make sure this server is running on http://localhost:3000. To ensure this happens start the backend server before the frontend.

# End Points

#### GET all cards - /api/v1/cards
No paramaters are required for this endpoint. It will return an array of all the cards exisiting in the backend. By default there are two cards, *Grocery List*, and *Chores List*. They have 3 items and 1 item, respectively. 

#### GET a specific card - /api/v1/cards/:id
In order to get all the information for a specefic card you need to send in the card ID through the params. This will return the card object.

#### POST a new card - /api/v1/cards

In order to post a card you must pass in a *name* and a *list*. Name should be a string and list should be an array. containing at least one list object. The response for this request will be the new card created.
  
#### PUT changes in an exisiting card - /api/v1/cards/:id

In order to post a card you must pass in an *id*, *name*, and *list*. The id will be an integer, the name should be a string and the list should be an array containg at least one list object. This will send a response of a 204 status code.
  
#### DELETE a card - /api/v1/cards/:id

In order to delete a card you must send in the id of said card.
