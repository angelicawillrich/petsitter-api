import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import routes from './routes';
import connectDB from './db';

const app = express();
const conn = connectDB()
console.log('conn', conn)

dotenv.config(); // config env vars

// Express config.
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Rotas
app.use('/', routes);

const port = 3000;
app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}!`);
});
