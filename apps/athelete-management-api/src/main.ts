import express from 'express';

import { config, connectDb } from '@config/index';
import { router } from '@routes/main.route';
import errorHandler from './middlewares/errorHandler.middleware';

const app = express();

connectDb()

app.use(express.json());
app.use('/api/v1', router);

app.use(errorHandler)

const port: number = config.port;

const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});

server.on('error', console.error);
