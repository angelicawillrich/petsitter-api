import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import routes from './routes';
import connectDB from './db';
import errorHandler from './middlewares/error.middleware';

const app = express();
const conn = connectDB()

dotenv.config(); // config env vars

// Express config.
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Routes
app.use('/', routes);

app.use(errorHandler);

const port = 3000;
app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}!`);
});
