const express = require('express');
const path = require('path');
const gameRoots = require('./routes/game');

const app = express();

app.listen(3000, () => {
  console.log('Server is listening at http://localhost:3000 Lets play a game!');
});

app.use(express.static(
  path.join(__dirname, 'public'),
));

gameRoots(app);