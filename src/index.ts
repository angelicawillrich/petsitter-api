import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import routes from './routes';
import connectDB from './db';
import * as path from 'path';
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
app.use(bodyParser.json({limit: '50mb'}));
const directory = path.join(process.cwd(), 'dist', 'images');
app.use('/images', express.static(directory));

// Routes
app.use('/', routes);

app.use(errorHandler);

const port = 3000;
app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}!`);
});
