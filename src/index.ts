import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import routes from './routes';
import connectDB from './db';
import errorHandler from './middlewares/errors/error.middleware';

const app = express();
connectDB();

interface SessionData {
  user: string,
  expiresAt: number
}

export const sessions: {[token: string]: SessionData} = {};

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
