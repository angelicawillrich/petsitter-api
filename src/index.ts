const express = require('express');
const mongoose = require('mongoose');

const app = express();

mongoose.connect('mongodb://db:27017/petsitter', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to MongoDB');
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

const port = 3000;
app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
